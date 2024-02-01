package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Service.Request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService{

    public ResponseEntity<?> loginWithCredentials(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if(DatabaseHandler.getInstance().getUserDao().checkUsername(username) && BCrypt.checkpw(password,DatabaseHandler.getInstance().getUserDao().selectPassword(username))){
            return ResponseEntity.ok().body("{\"message\": \"You are logged in\"}");
        }
        else{
            return ResponseEntity.status(401).body("{\"message\": \"Incorrect password\"}");
        }
    }



}
