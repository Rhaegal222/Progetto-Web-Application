package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.BanRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@Service
public class UserManagementService {

    public ResponseEntity<?> findAllUser() {
        ArrayList<User> users = DatabaseHandler.getInstance().getUserDao().findAll().join();
        return ResponseEntity.ok().body(users);
    }

    public ResponseEntity<?> banUser(@RequestBody BanRequest banRequest) {
        User user = DatabaseHandler.getInstance().getUserDao().findByEmail(banRequest.getEmail()).join();
        if(user.getBanned()){
            return ResponseEntity.status(401).body("User is already banned");
        }
        else{
            user.setBanned(true);
            DatabaseHandler.getInstance().getUserDao().banningUser(banRequest.getEmail());
            return ResponseEntity.ok().body("User banned");
        }

    }
}
