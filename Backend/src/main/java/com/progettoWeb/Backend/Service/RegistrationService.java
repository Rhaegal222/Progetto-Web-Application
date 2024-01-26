package com.progettoWeb.Backend.Service;

import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Model.User;
import com.progettoWeb.Backend.Persistence.Request.LoginRequest;
import com.progettoWeb.Backend.Persistence.Request.RegistrationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class RegistrationService {
    public ResponseEntity<?> doRegistration(RegistrationRequest registrationRequest) {
        String name = registrationRequest.getName();
        String surname = registrationRequest.getSurname();
        String role = registrationRequest.getRole();
        String username = registrationRequest.getUsername();
        String password = registrationRequest.getPassword();

        //TODO: aggiungere controlli sulla registrazione
        User user = new User(name, surname, role, username, password);
        DatabaseHandler.getInstance().getUserDao().insertUser(user);
        return ResponseEntity.ok().body("{\"message\": \"You are registered\"}");

        //return ResponseEntity.status(401).body("{\"message\": \"Incorrect password\"}");

    }
}