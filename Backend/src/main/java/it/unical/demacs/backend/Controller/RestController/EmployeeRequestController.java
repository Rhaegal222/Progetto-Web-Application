package it.unical.demacs.backend.Controller.RestController;

import it.unical.demacs.backend.Service.EmployeeRequestService;
import it.unical.demacs.backend.Service.Request.SendReqRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeRequestController {

    private final EmployeeRequestService employeeRequestService;

    //POST
    @PostMapping("/api/sendRequest")
    public ResponseEntity<?> sendRequest(@RequestBody SendReqRequest sendReqRequest) {return employeeRequestService.sendRequest(sendReqRequest);}

    //GET
    @GetMapping("/api/getRequests")
    public ResponseEntity<?> getRequests(@RequestParam String type) {
        return employeeRequestService.getRequests(type);
    }
    @GetMapping("/api/getUserRequests")
    public ResponseEntity<?> getUserRequests(@RequestParam long user) {return employeeRequestService.getUserRequests(user);}
    @GetMapping("/api/requests")
    public ResponseEntity<?> searchRequest(@RequestParam(required = false) String status, @RequestParam(required = false) String search) {
        if (search == null && (status == null || status.equals("all"))) {return employeeRequestService.findAll();}
        else if (search == null) {search = "";}
        else if (status == null) {status = "";}

        return employeeRequestService.searchRequest(status, search);
    }
}
