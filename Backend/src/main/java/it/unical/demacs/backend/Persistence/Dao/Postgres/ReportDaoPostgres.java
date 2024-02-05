package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ReportDao;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class ReportDaoPostgres implements ReportDao {
    Connection con;
    public ReportDaoPostgres(Connection con){
        this.con = con;
    }
    @Override
    public CompletableFuture<ArrayList<EmployeeRequest>> findAll() {
        return null;
    }

    @Override
    public CompletableFuture<EmployeeRequest> findByPrimaryKey(Long id) {
        return null;
    }
}
