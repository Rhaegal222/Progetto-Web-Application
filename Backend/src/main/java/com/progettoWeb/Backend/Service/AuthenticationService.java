package com.progettoWeb.Backend.Service;

import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Model.User;
import com.progettoWeb.Backend.Persistence.Request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthenticationService {
    public ResponseEntity<?> doLogin(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        if (username.equals("admin") && password.equals("admin")) {
            return ResponseEntity.ok().body("{\"message\": \"You are logged in\"}");
        } else {
            return ResponseEntity.status(401).body("{\"message\": \"Incorrect password\"}");
        }
    }
}
        /*
        // Verifica se l'username esiste nel database
        User user = DatabaseHandler.getInstance().getUserDao().findByPrimaryKey(username);

        if (user == null) {
            // Se l'utente non esiste, restituisci un messaggio di errore
            return ResponseEntity.status(401).body("{\"message\": \"There are no users with this username\"}");
        } else {
            // Se l'utente esiste, verifica la corrispondenza della password
            if (user.getPassword().equals(password)){
                // Se la password è corretta, restituisci un messaggio di successo
                return ResponseEntity.ok().body("{\"message\": \"You are logged in\"}");
            } else {
                // Se la password non è corretta, restituisci un messaggio di errore
                return ResponseEntity.status(401).body("{\"message\": \"Incorrect password\"}");
            }
        }

         */

