package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ReturnDao;
import it.unical.demacs.backend.Persistence.Model.Return;

import java.sql.Connection;
import java.sql.Date;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class ReturnDaoPostgres implements ReturnDao {
    Connection con;
    public ReturnDaoPostgres(Connection con){
        this.con = con;
    }
    @Override
    public CompletableFuture<ArrayList<Return>> findAll() {
        return null;
    }

    @Override
    public CompletableFuture<Return> findByPrimaryKey(Long id) {
        return null;
    }

    @Override
    public CompletableFuture<Return> findByUser(Long id) {
        return null;
    }

    @Override
    public CompletableFuture<Return> findByItem(Long id) {
        return null;
    }

    @Override
    public CompletableFuture<Return> findByDate(Date returnDate) {
        return null;
    }

    @Override
    public CompletableFuture<Boolean> insertReturn(Return ret) {
        return null;
    }

    @Override
    public CompletableFuture<Boolean> updateReturn(Return ret) {
        return null;
    }

    @Override
    public CompletableFuture<Boolean> deleteReturn(Long id) {
        return null;
    }
}
