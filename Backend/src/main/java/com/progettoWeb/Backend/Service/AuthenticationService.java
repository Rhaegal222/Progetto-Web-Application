package com.progettoWeb.Backend.Service;

import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthenticationService {
    public ResponseEntity<?> doLogin(LoginRequest loginRequest){
        if(DatabaseHandler.getInstance().getUserDao().findByPrimaryKey(loginRequest.getUsername()) == null) {
            return ResponseEntity.status(401).body("\"{\"message\": \"You are not authorized to perform this action\"}\"");
        }
        else {
            return ResponseEntity.ok().body("\"{\"message\": \"You are logged in\"}\"");
        }
    }


}
