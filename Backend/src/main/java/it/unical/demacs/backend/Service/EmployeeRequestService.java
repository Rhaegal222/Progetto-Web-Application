package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Date;

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

}
