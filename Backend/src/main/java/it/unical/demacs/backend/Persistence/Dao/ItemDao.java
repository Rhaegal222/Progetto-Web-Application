package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Item;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ItemDao {
    public CompletableFuture<ArrayList<Item>> findAll();

    public CompletableFuture<Item> findByPrimaryKey(Long id);

    public CompletableFuture<Item> findByName(String name) throws SQLException;

    public CompletableFuture<Boolean> insertItem(Item Item);

    public CompletableFuture<Boolean> updateItem(Item Item);

    public CompletableFuture<Boolean> deleteItem(Long id);
}