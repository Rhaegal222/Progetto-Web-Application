package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.RegistrationRequest;
import it.unical.demacs.backend.Persistence.RegexHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class RegistrationService {
    public ResponseEntity<?> doRegistration(RegistrationRequest registrationRequest) {
        try {
            DatabaseHandler.getInstance().openConnection();
            String name = registrationRequest.getName();
            String surname = registrationRequest.getSurname();
            String email = registrationRequest.getEmail();
            String password = registrationRequest.getPassword();



            if (name == null || surname == null || email == null || password == null) {
                return ResponseEntity.badRequest().body("{\"message\": \"Missing fields\"}");
            }
            else {
                if(RegexHandler.getInstance().checkOnlyChar(name) || RegexHandler.getInstance().checkOnlyChar(surname)){
                    return ResponseEntity.badRequest().body("{\"message\": \"Name and surname must contain only letters\"}");
                }
                else{
                    if(!RegexHandler.getInstance().checkEmail(email)){
                        return ResponseEntity.badRequest().body("{\"message\": \"Invalid email\"}");
                    }
                    else{
                        if(DatabaseHandler.getInstance().getUserDao().checkEmail(email)){
                            return ResponseEntity.badRequest().body("{\"message\": \"Email already in use\"}");
                        }
                        else{
                            if(!RegexHandler.getInstance().checkPassword(password)){
                                return ResponseEntity.badRequest().body("{\"message\": \"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character\"}");
                            }
                            else{
                                String encryptedPass = RegexHandler.getInstance().encryptPassword(password);
                                User user = new User(encryptedPass, email, name, surname, false);
                                if(email.equals("magazzino.unical@libeo.it")){
                                    user.setBanned(true);
                                }
                                CompletableFuture<Boolean> insertResult = DatabaseHandler.getInstance().getUserDao().insertUser(user);

                                try {
                                    // Attendi il completamento dell'inserimento
                                    Boolean success = insertResult.get();

                                    if (success) {
                                        return ResponseEntity.ok().body("{\"message\": \"You are registered\"}");
                                    } else {
                                        return ResponseEntity.status(401).body("{\"message\": \"Error during registration\"}");
                                    }
                                } catch (InterruptedException | ExecutionException e) {
                                    return ResponseEntity.status(500).body("{\"message\": \"Internal Server Error\"}");
                                }
                            }
                        }
                    }
                }
            }
        } finally {
            DatabaseHandler.getInstance().closeConnection();
        }

    }

}