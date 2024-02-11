package it.unical.demacs.backend.Controller.Servlet;

import it.unical.demacs.backend.Service.EmployeeRequestService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@WebServlet("/api/changeStatusRequest")
@RequiredArgsConstructor
public class ChangeStatusEmployeeRequestServlet extends HttpServlet {
    private final EmployeeRequestService employeeRequestService;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        employeeRequestService.changeStatusEmployeeRequest(request, response);
    }
}
