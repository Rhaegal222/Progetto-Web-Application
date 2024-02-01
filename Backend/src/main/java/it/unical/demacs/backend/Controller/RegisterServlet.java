package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.io.IOException;

@WebServlet
@CrossOrigin(origins = "http://localhost:4200")
public class RegisterServlet extends HttpServlet {

    void outputJSON(HttpServletResponse response, String message, String error) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(" {\"message\": \""+message+"\", \"errorCode\": \""+error+"\"}");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // METTERLA NELLA CLASSE SERVICE
        User u = new User
                (
                        request.getParameter("name"),
                        request.getParameter("surname"),
                        request.getParameter("role"),
                        request.getParameter("username"),
                        request.getParameter("password"),
                        request.getParameter("email")
                );

        if(DatabaseHandler.getInstance().getUserDao().findByPrimaryKey(request.getParameter("username")) == null){
            response.setStatus(HttpServletResponse.SC_OK);
            outputJSON(response, "Registration completed", "OK");
        }else{
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            outputJSON(response, "Error", "ERROR");
        }
    }
}