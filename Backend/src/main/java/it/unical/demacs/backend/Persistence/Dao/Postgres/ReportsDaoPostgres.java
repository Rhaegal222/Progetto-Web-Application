package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ReportsDao;
import it.unical.demacs.backend.Persistence.Model.Reports;
import org.springframework.scheduling.annotation.Async;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class ReportsDaoPostgres implements ReportsDao {
    Connection con;
    public ReportsDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Reports>> findAll() {
        ArrayList<Reports> reports = new ArrayList<>();
        try{
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM reports");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Reports report = new Reports();
                report.setIdReport(rs.getLong("id_report"));
                reports.add(report);
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }

        return CompletableFuture.completedFuture(reports);
    }

    @Override
    @Async
    public CompletableFuture<Reports> findByPrimaryKey(Long id) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM reports WHERE id_report = ?");
            stmt.setLong(1,id);

            ResultSet rs = stmt.executeQuery();
            Reports reports = new Reports();
            if (rs.next()) {
                reports.setIdReport(rs.getLong("id_report"));
            }
            return CompletableFuture.completedFuture(reports);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
