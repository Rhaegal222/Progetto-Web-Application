package com.progettoWeb.Backend.Service;

import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Model.User;
import com.progettoWeb.Backend.Persistence.Request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthenticationService {
    public ResponseEntity<?> doLogin(@RequestBody LoginRequest loginRequest) {
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
