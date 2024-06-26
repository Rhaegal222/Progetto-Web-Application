package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.Dao.EmployeeRequestDao;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.SendReqRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;

@Service
public class EmployeeRequestService {

    void outputJSON(HttpServletResponse response, String message, String error) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", ""); // Attenzione: l'uso del carattere '' è sconsigliato in produzione per ragioni di sicurezza
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "3600");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        if (error == null) {
            response.setStatus(200);
        }
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
            assert employeeRequest != null;
            if (DatabaseHandler.getInstance().getEmployeeRequestDao().deleteEmployeeRequest(employeeRequest.getIdEmployeeRequest()).join()) {
                outputJSON(response, "Request deleted", "0");
            } else {
                outputJSON(response, "Error deleting request", "1");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> sendRequest(SendReqRequest sendReqRequest) {
        try {
            DatabaseHandler.getInstance().openConnection();

            String title = sendReqRequest.getTitle();
            String description = sendReqRequest.getDescription();
            String type = sendReqRequest.getType();
            String unFormattedDate = sendReqRequest.getDate();
            String date = unFormattedDate.substring(0, 10);


            long product = sendReqRequest.getRequestedItem();
            String emailUser = sendReqRequest.getRequestingUser();
            if(type.isEmpty() || emailUser.isEmpty() || date.isEmpty() || product == 0) {
                return ResponseEntity.status(400).body("Invalid request");
            }


            User requestingUser = DatabaseHandler.getInstance().getUserDao().findByEmail(emailUser).join();
            Item requestedItem = DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(product).join();

            String requestTitle = null;
            if (type.equals("returnRequest")) {
                requestTitle = "Richiesta di reso - " + title;
            } else {
                if (type.equals("requestProduct")) {
                    requestTitle = "Richiesta di un prodotto - " + title;
                } else {
                    return ResponseEntity.status(400).body("Invalid request");
                }
            }

            EmployeeRequest employeeRequest = new EmployeeRequest(requestingUser, requestedItem, title, description, "pending", type, date);
            DatabaseHandler.getInstance().getEmployeeRequestDao().insertEmployeeRequest(employeeRequest);

            String emailContent = requestTitle + " da parte di " + requestingUser.getEmail() + "\n\n" + description;
            ArrayList<User> admins = DatabaseHandler.getInstance().getUserDao().getAdmins().join();
            for (User admin : admins) {
                SendMail.getInstance().sendEmail(requestTitle, emailContent, admin.getEmail());
            }

            // Puoi gestire la risposta qui, ad esempio, restituendo un ResponseEntity di successo
            return ResponseEntity.ok("Email sent successfully to admins");
        } catch (Exception e) {
            // Gestione delle eccezioni durante l'invio dell'email
            return ResponseEntity.status(500).body("Error sending email: " + e.getMessage() + " " + e.getCause());
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> getRequests(String type) {
        try {
            DatabaseHandler.getInstance().openConnection();
            ArrayList<EmployeeRequest> requests = DatabaseHandler.getInstance().getEmployeeRequestDao().getRequestsByType(type).join();
            return ResponseEntity.ok(requests);
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> getUserRequests(String email) {
        try {
            DatabaseHandler.getInstance().openConnection();
            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(email).join();
            ArrayList<EmployeeRequest> requests = DatabaseHandler.getInstance().getEmployeeRequestDao().getRequestsByUser(user.getIdUser()).join();
            return ResponseEntity.ok(requests);
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> searchRequest(String status, String fieldContent) {
        try{
            DatabaseHandler.getInstance().openConnection();
            ArrayList<EmployeeRequest> requestsByStatus;
            if(status.equals("all")){
                requestsByStatus = DatabaseHandler.getInstance().getEmployeeRequestDao().findAll().join();
            }
            else{
                requestsByStatus = DatabaseHandler.getInstance().getEmployeeRequestDao().getRequestsByStatus(status).join();
            }
            ArrayList<EmployeeRequest> requests = new ArrayList<>();
            if(!fieldContent.isEmpty()){
                for(EmployeeRequest request : requestsByStatus) {
                    String title = request.getTitle().toLowerCase();
                    String description = request.getDescription().toLowerCase();
                    String content = fieldContent.toLowerCase();
                    if(title.contains(content) || description.contains(content)){
                        requests.add(request);
                    }
                }
            }
            else{
                requests = requestsByStatus;
            }
            return ResponseEntity.ok(requests);
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public void changeStatusEmployeeRequest(HttpServletRequest request, HttpServletResponse response) {
        try {
            DatabaseHandler.getInstance().openConnection();
            EmployeeRequest employeeRequest = null;
            Item item = null;
            String idEmployeeRequestString = request.getParameter("idEmployeeRequest");
            String newStatus = request.getParameter("newStatus");


            if (idEmployeeRequestString != null && !idEmployeeRequestString.isEmpty()) {
                employeeRequest = new EmployeeRequest(Long.parseLong(idEmployeeRequestString));
                item = employeeRequest.getRequestedItem();
            }
            assert employeeRequest != null;


            if(newStatus.equals("r")){
                newStatus = "refused";
            }
            else if(newStatus.equals("a")){
                newStatus = "accepted";
                User requestingUser = DatabaseHandler.getInstance().getUserDao().findByEmail(employeeRequest.getRequestingUser().getEmail()).join();
                item.setAssignedUser(requestingUser);
            }
            if (employeeRequest.getStatus().equals("pending")) {
                employeeRequest.setStatus(newStatus);
            } else {
                outputJSON(response, "Error refusing request", "1");
            }

            DatabaseHandler.getInstance().getEmployeeRequestDao().updateEmployeeRequest(employeeRequest).join();
            DatabaseHandler.getInstance().getItemDao().updateItem(employeeRequest.getRequestedItem()).join();
            String responseMessage = "Request status changed to " + newStatus;
            outputJSON(response, responseMessage , "0");

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> findAll() {
        try {
            DatabaseHandler.getInstance().openConnection();
            ArrayList<EmployeeRequest> requests = DatabaseHandler.getInstance().getEmployeeRequestDao().findAll().join();
            return ResponseEntity.ok(requests);
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> allRequests() {
        try {
            DatabaseHandler.getInstance().openConnection();
            ArrayList<EmployeeRequest> requests = DatabaseHandler.getInstance().getEmployeeRequestDao().findAll().join();
            return ResponseEntity.ok(requests);
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

}
