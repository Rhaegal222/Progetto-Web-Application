package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@Service
public class UserManagementService {

    public ResponseEntity<?> findAllUser() {
        try{
            DatabaseHandler.getInstance().openConnection();
            ArrayList<User> users = DatabaseHandler.getInstance().getUserDao().findAll().join();
            return ResponseEntity.ok().body(users);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> banUser(@RequestBody UserRequest userRequest, boolean status) {
        try{
            DatabaseHandler.getInstance().openConnection();
            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(userRequest.getEmail()).join();
            if(user.getBanned()){
                if(status){
                    return ResponseEntity.status(401).body("User is already banned");
                }
                else{
                    user.setBanned(false);
                    DatabaseHandler.getInstance().getUserDao().banningUser(userRequest.getEmail(), status);
                    return ResponseEntity.ok().body("User unbanned");
                }
            }
            else{
                if(status){
                    user.setBanned(true);
                    DatabaseHandler.getInstance().getUserDao().banningUser(userRequest.getEmail(), status);
                    return ResponseEntity.ok().body("User banned/refused");
                }
                else{
                    return ResponseEntity.status(401).body("User is not banned");
                }
            }
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }

    }


    public ResponseEntity<?> changeRole(UserRequest userRequest) {
        try{
            DatabaseHandler.getInstance().openConnection();
            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(userRequest.getEmail()).join();
            if(user.getRole() == null){
                user.setRole("n");
            }
            if(user.getRole().equals("a")){
                return ResponseEntity.status(401).body("User is already admin");
            }
            else if(user.getRole().equals("s")){
                user.setRole("a");
                DatabaseHandler.getInstance().getUserDao().updateRole(user);
                return ResponseEntity.ok().body("User promoted to admin");
            }
            else if(user.getRole().equals("e")){
                user.setRole("s");
                DatabaseHandler.getInstance().getUserDao().updateRole(user);
                return ResponseEntity.ok().body("User promoted to store manager");
            }
            else{
                user.setRole("e");
                DatabaseHandler.getInstance().getUserDao().updateRole(user);
                return ResponseEntity.ok().body("User accepted");
            }
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }
}
