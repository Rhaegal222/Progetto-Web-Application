package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.EmployeeRequestDao;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.User;
import org.springframework.scheduling.annotation.Async;

import java.sql.*;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class EmployeeRequestPostgres implements EmployeeRequestDao {
    Connection con;
    public EmployeeRequestPostgres(Connection con){
        this.con = con;
    }
    @Override
    @Async
    public CompletableFuture<ArrayList<EmployeeRequest>> findAll() {
        return null;
    }


        @Override
    public CompletableFuture<EmployeeRequest> findByPrimaryKey(Long id) {
        return null;
    }

    @Override
    public CompletableFuture<EmployeeRequest> findByUser(Long id) {
        return null;
    }

    @Override
    public CompletableFuture<EmployeeRequest> findByItem(Long id) {
        return null;
    }

    @Override
    public CompletableFuture<EmployeeRequest> findByDate(Date requestDate) {
        return null;
    }

    @Override
    public CompletableFuture<Boolean> insertEmployeeRequest(EmployeeRequest employeeRequest) {
        return null;
    }

    @Override
    public CompletableFuture<Boolean> updateEmployeeRequest(EmployeeRequest employeeRequest) {
        return null;
    }

    @Override
    public CompletableFuture<Boolean> deleteEmployeeRequest(Long id) {
        return null;
    }
}
