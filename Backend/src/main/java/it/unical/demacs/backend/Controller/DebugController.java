package it.unical.demacs.backend.Controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")

public class DegubController {

    @GetMapping("/api/debug")
    public String debug() {
        return "Debugging";
    }



}
