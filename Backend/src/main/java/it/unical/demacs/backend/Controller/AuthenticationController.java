package it.unical.demacs.backend.Controller;
import it.unical.demacs.backend.Service.Request.LoginRequest;
import it.unical.demacs.backend.Service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
    //Arrivano le richieste HTTP
    private final AuthenticationService authenticationService;

    @PostMapping("/api/login")
    public ResponseEntity<?> dologin(@RequestBody LoginRequest loginRequest){
        return authenticationService.doLogin(loginRequest);
    }
    //public ResponseEntity<?> dologin(@RequestParam String username, @RequestParam String password){

}