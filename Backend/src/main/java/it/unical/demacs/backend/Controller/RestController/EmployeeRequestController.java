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
    public ResponseEntity<?> getRequests(@RequestParam(required = false) String status, @RequestParam(required = false) String search) {
        if (search == null && (status == null || status.equals("all"))) {return employeeRequestService.findAll();}
        else if (search == null) {search = "";}
        else if (status == null) {status = "";}

        return employeeRequestService.searchRequest(status, search);
    }
    @GetMapping("/api/getUserRequests")
    public ResponseEntity<?> getUserRequests(@RequestParam String email) {return employeeRequestService.getUserRequests(email);}
    @GetMapping("/api/requests")
    public ResponseEntity<?> searchRequest(@RequestParam(required = false) String status, @RequestParam(required = false) String search) {
        if (search == null && (status == null || status.equals("all"))) {return employeeRequestService.allRequests();}
        else if (search == null) {return employeeRequestService.searchRequest(status, "");}
        else if (status == null || status.equals("all")) {return employeeRequestService.searchRequest("", search);}
        else {return employeeRequestService.searchRequest(status, search);}
    }
    @GetMapping("/api/allRequests")
    public ResponseEntity<?> allRequests() {return employeeRequestService.allRequests();}
}
