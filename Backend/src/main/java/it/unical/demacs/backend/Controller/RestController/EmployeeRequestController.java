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

    @PostMapping("/api/sendRequest")
    public ResponseEntity<?> sendRequest(@RequestBody SendReqRequest sendReqRequest) {
        return employeeRequestService.sendRequest(sendReqRequest);
    }

    @GetMapping("/api/getRequests")
    public ResponseEntity<?> getRequests(@RequestParam String type) {
        return employeeRequestService.getRequests(type);
    }

    @GetMapping("/api/getUserRequests")
    public ResponseEntity<?> getUserRequests(@RequestParam Long user) {
        return employeeRequestService.getUserRequests(user);
    }

    /*
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
     */
    @GetMapping("/api/requests")
    public ResponseEntity<?> searchRequest(@RequestParam String status, @RequestParam String search) {
        if (search == null && (status == null || status.equals("all"))) {
            return employeeRequestService.findAll();
        } else if (search == null) {
            return employeeRequestService.searchRequest(status, "");

        } else if (status == null || status.equals("all")) {
            return employeeRequestService.searchRequest("", search);
        } else {
            return employeeRequestService.searchRequest(status, search);
        }
    }

}
