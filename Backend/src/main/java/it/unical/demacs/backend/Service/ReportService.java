package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;


@Service
public class ReportService {


    public ResponseEntity<?> getRequestInRange(String range) {
        try{
            DatabaseHandler.getInstance().openConnection();
            String start = null, end = null;
            if(range.equals("week")){
                start = LocalDate.now().minusDays(7).toString();
                end = LocalDate.now().toString();
            }
            if (range.equals("month")){
                start = LocalDate.now().minusMonths(1).toString();
                end = LocalDate.now().toString();
            }
            if (range.equals("year")){
                start = LocalDate.now().minusYears(1).toString();
                end = LocalDate.now().toString();
            }
            ArrayList<EmployeeRequest> requests = DatabaseHandler.getInstance().getEmployeeRequestDao().getEmployeeRequestInRange(start, end).get();
            return ResponseEntity.ok().body(requests);
        }
        catch (Exception e){
            return ResponseEntity.status(500).body("{\"message\": \"Internal Server Error\"}");
        }
    }
}
