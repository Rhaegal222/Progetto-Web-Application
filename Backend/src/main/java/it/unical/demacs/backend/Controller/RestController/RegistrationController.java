package it.unical.demacs.backend.Controller.RestController;

import it.unical.demacs.backend.Service.Request.RegistrationRequest;
import it.unical.demacs.backend.Service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/api/registration")
    public ResponseEntity<?> doRegistration(@RequestBody RegistrationRequest registrationRequest){return registrationService.doRegistration(registrationRequest);}
}