package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReportService {

    public void getRequestInRange(HttpServletRequest request, HttpServletResponse response) {
        try {
            DatabaseHandler.getInstance().openConnection();
            //Range può essere: settimana, mese, anno
            String range = request.getParameter("range");
            String start = null, end = null;
            if (range != null && !range.isEmpty()) {
                if (range.equals("week")) {
                    //Start data di 7 giorni fa
                    //End data di oggi
                    start = LocalDate.now().minusDays(7).toString();
                    end = LocalDate.now().toString();
                } else if (range.equals("month")) {
                    //Start data di 30 giorni fa
                    //End data di oggi
                    start = LocalDate.now().minusDays(30).toString();
                    end = LocalDate.now().toString();
                } else if (range.equals("year")) {
                    //Start data di 365 giorni fa
                    //End data di oggi
                    start = LocalDate.now().minusDays(365).toString();
                    end = LocalDate.now().toString();
                }
                DatabaseHandler.getInstance().getEmployeeRequestDao().getEmployeeRequestInRange(start, end);
            } else {
                response.getWriter().write("Invalid range");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
