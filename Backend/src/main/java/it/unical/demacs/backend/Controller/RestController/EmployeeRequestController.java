package it.unical.demacs.backend.Controller.RestController;

import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Service.AuthenticationService;
import it.unical.demacs.backend.Service.EmployeeRequestService;
import it.unical.demacs.backend.Service.Request.LoginRequest;
import it.unical.demacs.backend.Service.Request.SendReqRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeRequestController {

    private final EmployeeRequestService employeeRequestService;

    @PostMapping("/api/sendRequest")
    public ResponseEntity<?> sendRequest(@RequestBody SendReqRequest sendReqRequest) {
        return employeeRequestService.sendRequest(sendReqRequest);
    }

}
