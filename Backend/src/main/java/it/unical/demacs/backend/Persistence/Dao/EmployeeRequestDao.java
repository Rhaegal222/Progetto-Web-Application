package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import org.springframework.scheduling.annotation.Async;

import java.sql.Date;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface EmployeeRequestDao {
    CompletableFuture<ArrayList<EmployeeRequest>> findAll();
    CompletableFuture<EmployeeRequest> findByPrimaryKey(Long id);
    CompletableFuture<ArrayList<EmployeeRequest>> findByUser(Long id);
    CompletableFuture<EmployeeRequest> findByItem(Long id);
    CompletableFuture<ArrayList<EmployeeRequest>> findByDate(Date requestDate);
    CompletableFuture<Boolean> insertEmployeeRequest(EmployeeRequest employeeRequest);
    CompletableFuture<Boolean> updateEmployeeRequest(EmployeeRequest employeeRequest);
    CompletableFuture<Boolean> deleteEmployeeRequest(Long id);
    CompletableFuture<ArrayList<EmployeeRequest>> getRequestsByType(String type);
    CompletableFuture<ArrayList<EmployeeRequest>> getEmployeeRequestInRange(String start, String end);

    CompletableFuture<ArrayList<EmployeeRequest>> getRequestsByStatus(String status);

    CompletableFuture<ArrayList<EmployeeRequest>> getRequestsByUser(long user);
    CompletableFuture<ArrayList<EmployeeRequest>> findByItem(long idItem);

}
