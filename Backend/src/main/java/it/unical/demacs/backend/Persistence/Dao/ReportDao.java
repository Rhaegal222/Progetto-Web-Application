package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;

import java.sql.Date;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ReportDao {
    CompletableFuture<ArrayList<EmployeeRequest>> findAll();
    CompletableFuture<EmployeeRequest> findByPrimaryKey(Long id);
}
