package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.LoginRequest;
import it.unical.demacs.backend.Service.Response.JwtAuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class AuthenticationService{
    private final JwtService jwtService;
    @Autowired
    public AuthenticationService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public ResponseEntity<?> loginWithCredentials(LoginRequest loginRequest) {
        try{
            DatabaseHandler.getInstance().openConnection();
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(email).join();
            if (user != null) {
                if (BCrypt.checkpw(password, user.getPassword())) {
                    if(user.getBanned()){
                        return ResponseEntity.status(401).body("{\"message\": \"User is banned\"}");
                    }
                    else{
                        //Contenuto della response entity
                        String jwt = jwtService.generateToken(user);
                        ArrayList<EmployeeRequest> requests = user.getEmployeeRequests();
                        return ResponseEntity.ok(new JwtAuthResponse(jwt , requests));
                    }
                } else {
                    return ResponseEntity.badRequest().body("{\"message\": \"Wrong username/password\"}");
                }

            } else {
                return ResponseEntity.status(401).body("{\"message\": \"User not found\"}");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

}
