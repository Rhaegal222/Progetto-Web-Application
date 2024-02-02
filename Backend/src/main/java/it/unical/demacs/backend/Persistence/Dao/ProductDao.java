package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Product;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public interface ProductDao {
    public CompletableFuture<ArrayList<Product>> findAll();

    public CompletableFuture<Product> findByPrimaryKey(Long id);

    public CompletableFuture<Product> findByName(String name) throws SQLException;

    public CompletableFuture<Boolean> insertProduct(Product Product);

    public CompletableFuture<Boolean> updateProduct(Product Product);

    public CompletableFuture<Boolean> deleteProduct(Long id);
}