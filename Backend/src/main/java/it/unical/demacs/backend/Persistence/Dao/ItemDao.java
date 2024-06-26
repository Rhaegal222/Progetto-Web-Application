package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Item;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ItemDao {
    CompletableFuture<ArrayList<Item>> findAll();

    CompletableFuture<Item> findByPrimaryKey(Long id);

    CompletableFuture<ArrayList<Item>> findByName(String name);

    CompletableFuture<Boolean> insertItem(Item Item);

    CompletableFuture<Boolean> updateItem(Item Item);

    CompletableFuture<Boolean> deleteItem(Long id);

    CompletableFuture<ArrayList<Item>> findByCategory(String category);

    CompletableFuture<ArrayList<Item>> findItemsByUser(long idUser);
}