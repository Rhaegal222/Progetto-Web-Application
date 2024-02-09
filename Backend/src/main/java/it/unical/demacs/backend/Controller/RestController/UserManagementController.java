package it.unical.demacs.backend.Controller.RestController;

import it.unical.demacs.backend.Service.Request.NewPasswordRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import it.unical.demacs.backend.Service.UserManagementService;
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserManagementController {

    private final UserManagementService userManagementService;

    //POST
    @PostMapping("/api/ban-user")
    public ResponseEntity<?> banUser(@RequestParam String email){return userManagementService.banUser(email, true);}
    @PostMapping("/api/unban-user")
    public ResponseEntity<?> unbanUser(@RequestParam String email){return userManagementService.banUser(email, false);}
    @PostMapping("/api/changeRole-user")  //PROMUOVI: se s diventa a, se e diventa s, se è già a niente
    public ResponseEntity<?> changeRole(@RequestParam String email){return userManagementService.changeRole(email);}
    @PostMapping("/api/refuse-user") //RIFIUTA: utente viene direttamente bannato
    public ResponseEntity<?> refuseUser(@RequestParam String email){return banUser(email);}
    @PostMapping("/api/newPassword")
    public ResponseEntity<?> newPassword(@RequestBody NewPasswordRequest newPasswordRequest){return userManagementService.newPassword(newPasswordRequest);}

    // GET
    @GetMapping("/api/allUsers")
    public ResponseEntity<?> findAllUser(){return userManagementService.findAllUser();}
    @GetMapping("/api/users")
    public ResponseEntity<?> searchUsers(@RequestParam(required = false) String search, @RequestParam(required = false) String role) {
        if (search == null && (role == null || role.equals("all"))) {return userManagementService.findAllUser();}
        else if (search == null) {return userManagementService.searchUsers("", role);}
        else if (role == null || role.equals("all")) {return userManagementService.searchUsers(search, "");}
        else {return userManagementService.searchUsers(search, role);}
    }
}
