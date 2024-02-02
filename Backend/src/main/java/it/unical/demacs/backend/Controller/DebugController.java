package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Service.DebugService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class DebugController {

    private final DebugService debugService;

    @GetMapping("/api/debug")
    public ResponseEntity<?> debug() {
        return debugService.debug();
    }



}
