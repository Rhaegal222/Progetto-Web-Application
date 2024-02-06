package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Reports;

import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ReportsDao {
    CompletableFuture<ArrayList<Reports>> findAll();
    CompletableFuture<Reports> findByPrimaryKey(Long id);
}
