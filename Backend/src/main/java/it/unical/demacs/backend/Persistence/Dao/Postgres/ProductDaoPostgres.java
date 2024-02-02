package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ProductDao;
import it.unical.demacs.backend.Persistence.Model.Product;
import org.springframework.scheduling.annotation.Async;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class ProductDaoPostgres implements ProductDao{
    Connection con;
    public ProductDaoPostgres(Connection con){
        this.con = con;
    }


    @Override
    @Async
    public CompletableFuture<ArrayList<Product>> findAll() {
        ArrayList<Product> productsList = new ArrayList<>();
        String query = "SELECT * FROM products";
        try (
                PreparedStatement st = this.con.prepareStatement(query);
                ResultSet rs = st.executeQuery()) {
            while (rs.next()) {
                Product product = new Product();
                product.setIdProduct(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setType(rs.getString(3));
                product.setDescription(rs.getString(4));
                product.setLocation(rs.getString(5));
                product.setCategory(rs.getString(6));
                product.setImage(rs.getString(7));
                productsList.add(product);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return CompletableFuture.completedFuture(productsList);
    }
    @Override
    @Async
    public CompletableFuture<Product> findByPrimaryKey(Long id) {
        Product product = new Product();
        String query = "SELECT * FROM products WHERE id_product = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, id);
            executeQuery(product, st);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return CompletableFuture.completedFuture(product);
    }

    @Override
    @Async
    public CompletableFuture<Product> findByName(String name) {
        Product product = new Product();
        String query = "SELECT * FROM products WHERE name = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setString(1, name);
            executeQuery(product, st);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return CompletableFuture.completedFuture(product);
    }
    @Override
    @Async
    public CompletableFuture<Boolean> insertProduct(Product product) {
        String query = "INSERT INTO products (name, type, description, location, category, image_base64) VALUES (?, ?, ?, ?, ?, ?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            settingProduct(product, st);
            st.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(true);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> updateProduct(Product product) {
        String query = "UPDATE products SET name = ?, type = ?, description = ?, location = ?, category = ?, image = ? WHERE id_product = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            settingProduct(product, st);
            st.setInt(7, product.getIdProduct());
            st.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(true);
    }
    @Override
    public CompletableFuture<Boolean> deleteProduct(Long id) {
        String query = "DELETE FROM products WHERE id_product = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, id);
            st.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(true);
    }

    private void executeQuery(Product product, PreparedStatement st) throws SQLException {
        try (ResultSet rs = st.executeQuery()) {
            if (rs.next()) {
                product.setIdProduct(rs.getInt(1));
                product.setName(rs.getString(2));
                product.setType(rs.getString(3));
                product.setDescription(rs.getString(4));
                product.setLocation(rs.getString(5));
                product.setCategory(rs.getString(6));
                product.setImage(rs.getString(7));
            }
        }
    }
    private void settingProduct(Product product, PreparedStatement st) throws SQLException {
        st.setString(1, product.getName());
        st.setString(2, product.getType());
        st.setString(3, product.getDescription());
        st.setString(4, product.getLocation());
        st.setString(5, product.getCategory());
        st.setString(6, product.getImage());
    }
}
