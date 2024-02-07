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
            EmployeeRequest employeeRequest = new EmployeeRequest(Long.parseLong(request.getParameter("idEmployeeRequest")));
            String email = request.getParameter("email");
            if (employeeRequest.getRequestingUser().getEmail().equals(email)) {
                if (DatabaseHandler.getInstance().getEmployeeRequestDao().deleteEmployeeRequest(employeeRequest.getIdEmployeeRequest()).join()) {
                    outputJSON(response, "Request deleted", "0");
                } else {
                    outputJSON(response, "Error deleting request", "1");
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void insertEmployeeRequest(HttpServletRequest request, HttpServletResponse response) {
        try {
            DatabaseHandler.getInstance().openConnection();

            // Extract parameters from the request
            String requestDescription = request.getParameter("requestDescription");
            User user = new User(Long.parseLong(request.getParameter("idUser")));
            Item item = new Item(Long.parseLong(request.getParameter("idItem")));
            Date requestDate = Date.valueOf(request.getParameter("requestDate"));

            // Create an instance of EmployeeRequest using the extracted parameters
            EmployeeRequest employeeRequest = new EmployeeRequest(user, item, requestDescription, requestDate);

            // Insert the employee request into the database
            boolean result = DatabaseHandler.getInstance().getEmployeeRequestDao().insertEmployeeRequest(employeeRequest).join();

            // Check the result of the insertion and send appropriate response
            if (result) {
                outputJSON(response, "Request inserted successfully", "0");
            } else {
                outputJSON(response, "Error inserting request", "1");
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> sendRequest(SendReqRequest sendReqRequest) {
        try {
            String emailRequestingUser = sendReqRequest.getEmailRequestingUser();
            long idRequestedItem = sendReqRequest.getIdRequestedItem();
            String requestContent = sendReqRequest.getRequestContent();
            Date requestDate = sendReqRequest.getRequestDate();

            User requestingUser = DatabaseHandler.getInstance().getUserDao().findByEmail(emailRequestingUser).join();
            String requestTitle = null;
            if (requestContent.equals("reso")) {
                requestTitle = "Richiesta di reso da parte di " + requestingUser.getEmail() + " per " + idRequestedItem;
            } else
                if(requestContent.equals("richiesta")){
                requestTitle = "Richiesta prodotto da parte di " + requestingUser.getEmail() + " per " + idRequestedItem;
                }

            ArrayList<User> admins = DatabaseHandler.getInstance().getUserDao().getAdmins().join();
            for (User admin : admins) {
                SendMail.getInstance().sendEmail(requestTitle, requestContent, admin.getEmail());
            }

            EmployeeRequest employeeRequest = new EmployeeRequest(requestingUser, new Item(idRequestedItem), requestContent, requestDate);
            DatabaseHandler.getInstance().getEmployeeRequestDao().insertEmployeeRequest(employeeRequest).join();

            // Puoi gestire la risposta qui, ad esempio, restituendo un ResponseEntity di successo
            return ResponseEntity.ok("Email sent successfully to admins");
        } catch (Exception e) {
            // Gestione delle eccezioni durante l'invio dell'email
            return ResponseEntity.status(500).body("Error sending email: " + e.getMessage());
        }
    }
}
