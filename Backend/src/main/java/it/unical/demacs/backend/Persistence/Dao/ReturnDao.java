package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Return;

import java.sql.Date;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ReturnDao {
    CompletableFuture<ArrayList<Return>> findAll();
    CompletableFuture<Return> findByPrimaryKey(Long id);
    CompletableFuture<Return> findByUser(Long id);
    CompletableFuture<Return> findByItem(Long id);
    CompletableFuture<Return> findByDate(Date returnDate);
    CompletableFuture<Boolean> insertReturn(Return ret);
    CompletableFuture<Boolean> updateReturn(Return ret);
    CompletableFuture<Boolean> deleteReturn(Long id);
}
