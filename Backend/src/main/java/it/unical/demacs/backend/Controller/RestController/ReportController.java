package it.unical.demacs.backend.Controller.RestController;

import it.unical.demacs.backend.Service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/api/report")
    public ResponseEntity<?> report(@RequestParam("range") String range){return reportService.getRequestInRange(range);}
}
