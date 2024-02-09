package it.unical.demacs.backend.Controller.Servlet;

import it.unical.demacs.backend.Service.EmployeeRequestService;
import it.unical.demacs.backend.Service.ReportService;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@WebServlet("/api/report")
@RequiredArgsConstructor
public class ReportServlet extends HttpServlet {

        private final ReportService reportService;

        @Override
        protected void doGet(HttpServletRequest request, HttpServletResponse response) {
             reportService.getRequestInRange(request, response);
        }
}
