package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Service.Request.*;
import it.unical.demacs.backend.Service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/api/login")
    public ResponseEntity<?> loginWithCredentials(@RequestBody LoginRequest loginRequest) {
        return authenticationService.loginWithCredentials(loginRequest);
    }





}
