package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Returns;

import java.sql.Date;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ReturnsDao {
    CompletableFuture<ArrayList<Returns>> findAll();
    CompletableFuture<Returns> findByPrimaryKey(Long id);
    CompletableFuture<Returns> findByUser(Long id);
    CompletableFuture<Returns> findByItem(Long id);
    CompletableFuture<Returns> findByDate(Date returnDate);
    CompletableFuture<Boolean> insertReturn(Returns ret);
    CompletableFuture<Boolean> updateReturn(Returns ret);
    CompletableFuture<Boolean> deleteReturn(Long id);
}
