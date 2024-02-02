package it.unical.demacs.backend.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DebugService {
    public ResponseEntity<?> debug() {
        // return "Hello World";
        return ResponseEntity.ok().body("{\"message\": \"Hello World\"}");
    }
}
