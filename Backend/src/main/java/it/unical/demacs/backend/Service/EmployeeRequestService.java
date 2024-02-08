package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.SendReqRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;

@Service
public class EmployeeRequestService {

    void outputJSON(HttpServletResponse response, String message, String error) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(" {\"message\": \"" + message + "\", \"errorCode\": \"" + error + "\"}");
    }


    public void deleteEmployeeRequest(HttpServletRequest request, HttpServletResponse response) {
        try {
            DatabaseHandler.getInstance().openConnection();
            EmployeeRequest employeeRequest = null;
            String idEmployeeRequestString = request.getParameter("idEmployeeRequest");
            if (idEmployeeRequestString != null && !idEmployeeRequestString.isEmpty()) {
                employeeRequest = new EmployeeRequest(Long.parseLong(idEmployeeRequestString));
            }
            String email = request.getParameter("email");
            assert employeeRequest != null;
            if (DatabaseHandler.getInstance().getEmployeeRequestDao().deleteEmployeeRequest(employeeRequest.getIdEmployeeRequest()).join()) {
                outputJSON(response, "Request deleted", "0");
            } else {
                outputJSON(response, "Error deleting request", "1");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<?> sendRequest(SendReqRequest sendReqRequest) {
        try {
            DatabaseHandler.getInstance().openConnection();
            String emailRequestingUser = sendReqRequest.getEmailRequestingUser();
            long idRequestedItem = sendReqRequest.getIdRequestedItem();
            String requestContent = sendReqRequest.getRequestContent();
            String requestDate = sendReqRequest.getRequestDate();

            if(emailRequestingUser.isEmpty()| idRequestedItem == 0 || requestContent.isEmpty() || requestDate.isEmpty()){
                return ResponseEntity.status(400).body("Invalid request");
            }

            User requestingUser = DatabaseHandler.getInstance().getUserDao().findByEmail(emailRequestingUser).join();
            String requestTitle = null;
            if (requestContent.equals("Reso")) {
                requestTitle = "Richiesta di reso";
            } else
                if(requestContent.equals("Richiesta")) {
                    requestTitle = "Richiesta di un prodotto";
                }
                else {
                    return ResponseEntity.status(400).body("Invalid request");
                }

                Item requestedItem = new Item(idRequestedItem);
                EmployeeRequest employeeRequest = new EmployeeRequest(requestingUser, requestedItem , requestContent, requestDate);
                DatabaseHandler.getInstance().getEmployeeRequestDao().insertEmployeeRequest(employeeRequest);

            String emailContent = "Richiesta di " + requestContent + " da parte di " + requestingUser.getEmail() + " per " + requestedItem.getName();
            ArrayList<User> admins = DatabaseHandler.getInstance().getUserDao().getAdmins().join();
            for (User admin : admins) {
                SendMail.getInstance().sendEmail(requestTitle, emailContent, admin.getEmail());
            }

            // Puoi gestire la risposta qui, ad esempio, restituendo un ResponseEntity di successo
            return ResponseEntity.ok("Email sent successfully to admins");
        } catch (Exception e) {
            // Gestione delle eccezioni durante l'invio dell'email
            return ResponseEntity.status(500).body("Error sending email: " + e.getMessage());
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }
}
