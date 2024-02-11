package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.Dao.Postgres.UserProxy;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Persistence.RegexHandler;
import it.unical.demacs.backend.Service.Request.NewPasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
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

    public ResponseEntity<?> searchUsers(String search, String role) {
        try{
            DatabaseHandler.getInstance().openConnection();
            ArrayList<User> users;
            ArrayList<User> result = new ArrayList<>();

            if (role.isEmpty()){
                users = DatabaseHandler.getInstance().getUserDao().findAll().join();
            }
            else{
                users = DatabaseHandler.getInstance().getUserDao().findByRole(role).join();
            }

            if(!search.isEmpty()){
                for(User user : users){
                    if(user.getEmail().contains(search) || user.getName().contains(search) || user.getSurname().contains(search)){
                        result.add(user);
                    }
                }
                return ResponseEntity.ok().body(result);
            }
            else{
                result.addAll(users);
            }
            return ResponseEntity.ok().body(result);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> banUser(String email, boolean status) {
        try{
            DatabaseHandler.getInstance().openConnection();
            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(email).join();
            if(user.getBanned()){
                if(status){
                    return ResponseEntity.status(401).body("User is already banned");
                }
                else{
                    user.setBanned(false);
                    DatabaseHandler.getInstance().getUserDao().banningUser(email, false);
                    return ResponseEntity.ok().body("User unbanned");
                }
            }
            else{
                if(status){
                    user.setBanned(true);
                    DatabaseHandler.getInstance().getUserDao().banningUser(email, true);
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


    public ResponseEntity<?> changeRole(String email) {
        try {
            DatabaseHandler.getInstance().openConnection();
            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(email).join();
            if (user.getRole() == null || user.getRole().equals("np") || user.getRole().isEmpty()) {
                user.setRole("e");
                // Salva nel db
                DatabaseHandler.getInstance().getUserDao().updateRole(user);
                return ResponseEntity.ok().body("{\"message\": \"User promoted to employee\"}");
            } else if (user.getRole().equals("e")) {
                user.setRole("s");
                DatabaseHandler.getInstance().getUserDao().updateRole(user);
                return ResponseEntity.ok().body("{\"message\": \"User promoted to storekeeper\"}");
            } else if (user.getRole().equals("s")) {
                user.setRole("a");
                DatabaseHandler.getInstance().getUserDao().updateRole(user);
                return ResponseEntity.ok().body("{\"message\": \"User promoted to admin\"}");
            } else if (user.getRole().equals("a")) {
                return ResponseEntity.status(401).body("{\"message\": \"User already admin\"}");
            }
            return ResponseEntity.status(401).body("{\"message\": \"Unknown error\"}");
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> newPassword(@RequestBody NewPasswordRequest newPasswordRequest) {
        String email = newPasswordRequest.getEmail();
        String oldPassword = newPasswordRequest.getOldPassword();
        String newPassword = newPasswordRequest.getNewPassword();
        try {
            DatabaseHandler.getInstance().openConnection();
            User user = DatabaseHandler.getInstance().getUserDao().findByEmail(email).join();
            if (user != null) {
                String encryptedOld = RegexHandler.getInstance().encryptPassword(oldPassword);
                if (BCrypt.checkpw(encryptedOld, user.getPassword())) {
                    if (!RegexHandler.getInstance().checkPassword(newPassword)) {
                        return ResponseEntity.badRequest().body("{\"message\": \"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character\"}");
                    } else {
                        String encryptedNew = RegexHandler.getInstance().encryptPassword(newPassword);
                        user.setPassword(BCrypt.hashpw(encryptedNew, BCrypt.gensalt()));
                        DatabaseHandler.getInstance().getUserDao().updatePassword(user);
                        return ResponseEntity.ok().body("{\"message\": \"Password updated\"}");
                    }
                } else {
                    return ResponseEntity.badRequest().body("{\"message\": \"Current password is wrong\"}");
                }
            } else {
                return ResponseEntity.status(401).body("{\"message\": \"Invalid\"}");
            }
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> getUserProxy(String email) {
        try {
            DatabaseHandler.getInstance().openConnection();
            UserProxy userProxy = (UserProxy) DatabaseHandler.getInstance().getUserDao().findByEmail(email).join();
            if (userProxy == null) {
                return ResponseEntity.badRequest().body("{\"message\": \"No user found\"}");
            } else {
                ArrayList<Item> userItems = (userProxy.getItems() != null) ? userProxy.getItems() : new ArrayList<>();
                return ResponseEntity.ok(userItems);
            }
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }
}
