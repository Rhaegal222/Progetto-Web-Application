package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Service.Request.BanRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import it.unical.demacs.backend.Service.UserManagementService;
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping("/api/user-management")
    public ResponseEntity<?> findAllUser(){
        return userManagementService.findAllUser();
    }

    @PostMapping("/api/ban-user")
    public ResponseEntity<?> banUser(@RequestBody BanRequest banRequest){
        return userManagementService.banUser(banRequest);
    }
}
