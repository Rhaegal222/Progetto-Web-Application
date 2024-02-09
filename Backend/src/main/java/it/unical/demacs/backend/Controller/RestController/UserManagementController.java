package it.unical.demacs.backend.Controller.RestController;

import it.unical.demacs.backend.Service.Request.NewPasswordRequest;
import it.unical.demacs.backend.Service.Request.UserRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import it.unical.demacs.backend.Service.UserManagementService;
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserManagementController {

    private final UserManagementService userManagementService;


    @PostMapping("/api/ban-user")
    public ResponseEntity<?> banUser(@RequestBody UserRequest userRequest){
        return userManagementService.banUser(userRequest, true);
    }
    @PostMapping("/api/unban-user")
    public ResponseEntity<?> unbanUser(@RequestBody UserRequest userRequest){
        return userManagementService.banUser(userRequest, false);
    }
    //Promuovi
    @PostMapping("/api/changeRole-user")
    public ResponseEntity<?> changeRole(@RequestBody UserRequest userRequest){
        return userManagementService.changeRole(userRequest); //se s diventa a, se e diventa s, se è già a niente
    }

    //Rifiuta
    @PostMapping("/api/refuse-user")
    public ResponseEntity<?> refuseUser(@RequestBody UserRequest userRequest){
        return userManagementService.banUser(userRequest, true);
    }


    // GET
    @GetMapping("/api/allUsers")
    public ResponseEntity<?> findAllUser(){
        return userManagementService.findAllUser();
    }

    @GetMapping("/api/users")
    public ResponseEntity<?> searchUsers(@RequestParam(required = false) String search, @RequestParam(required = false) String role) {
        if (search == null && (role == null || role.equals("all"))) {
            return userManagementService.findAllUser();
        } else if (search == null) {
            return userManagementService.searchUsers("", role);
        } else if (role == null || role.equals("all")) {
            return userManagementService.searchUsers(search, "");
        } else {
            return userManagementService.searchUsers(search, role);
        }
    }

    @PostMapping("/api/newPassword")
    public ResponseEntity<?> newPassword(@RequestBody NewPasswordRequest newPasswordRequest){
        return userManagementService.newPassword(newPasswordRequest);
    }

}
