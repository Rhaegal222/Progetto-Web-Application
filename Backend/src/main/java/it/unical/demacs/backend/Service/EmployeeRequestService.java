package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;

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
}
