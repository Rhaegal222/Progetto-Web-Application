package com.progettoWeb.Backend.Service;

import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Model.User;
import com.progettoWeb.Backend.Persistence.Request.RegistrationRequest;
import com.progettoWeb.Backend.Persistence.RegexHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    public ResponseEntity<?> doRegistration(RegistrationRequest registrationRequest) {
        String name = registrationRequest.getName();
        String surname = registrationRequest.getSurname();
        String role = registrationRequest.getRole();
        String username = registrationRequest.getUsername();
        String password = registrationRequest.getPassword();
        String email = registrationRequest.getEmail();

        //TODO: aggiungere controlli sulla registrazione
        if(!DatabaseHandler.getInstance().getUserDao().checkUsername(username)) { //controlla che non ci sia uno username uguale
            if (!(RegexHandler.getInstance().checkOnlyChar(name) && RegexHandler.getInstance().checkOnlyChar(surname))) {
                return ResponseEntity.status(401).body("{\"message\": \"Name and surname must contain only letters\"}");
            }
            else{
                if(!RegexHandler.getInstance().checkEmail(email)){
                    return ResponseEntity.status(401).body("{\"message\": \"Email not valid\"}");
                }
                else{
                    if(DatabaseHandler.getInstance().getUserDao().checkEmail(email)){
                        return ResponseEntity.status(401).body("{\"message\": \"Email is already used\"}");
                    }
                    else{
                        if(!RegexHandler.getInstance().checkPassword(password)){
                            return ResponseEntity.status(401).body("{\"message\": \"Password not valid\"}");
                        }
                        else{
                            User user = new User(name, surname, role, email, username, password);
                            DatabaseHandler.getInstance().getUserDao().insertUser(user);
                            return ResponseEntity.ok().body("{\"message\": \"You are registered\"}");
                        }
                    }
                }
            }
        }
        else {
            return ResponseEntity.status(401).body("{\"message\": \"Username already exists\"}");
        }
    }
}