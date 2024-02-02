package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationService{

    public ResponseEntity<?> loginWithCredentials(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        User user = DatabaseHandler.getInstance().getUserDao().findByUsername(username).join();
        if(user == null){
            if(!BCrypt.checkpw(password, user.getPassword())){
                return ResponseEntity.badRequest().body("{\"message\": \"Wrong username/password\"}");
            }
            else{
                return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
            }

        }
        else{
            return ResponseEntity.ok().body("{\"message\": \"Login successful\"}");
        }
    }



}
