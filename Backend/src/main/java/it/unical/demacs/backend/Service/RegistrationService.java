package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.RegistrationRequest;
import it.unical.demacs.backend.Persistence.RegexHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {
    public ResponseEntity<?> doRegistration(RegistrationRequest registrationRequest) {
        String name = registrationRequest.getName();
        String surname = registrationRequest.getSurname();
        String username = registrationRequest.getUsername();
        String password = registrationRequest.getPassword();
        String email = registrationRequest.getEmail();

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
                            String encryptedPass = RegexHandler.getInstance().encryptPassword(password);
                            User user = new User(name, surname, email, username, encryptedPass);
                            if(DatabaseHandler.getInstance().getUserDao().insertUser(user)){
                                return ResponseEntity.ok().body("{\"message\": \"You are registered\"}");
                            }
                            else {
                                return ResponseEntity.status(401).body("{\"message\": \"Error during registration\"}");
                            }

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