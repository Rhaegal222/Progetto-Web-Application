package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ItemDao;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import org.springframework.scheduling.annotation.Async;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class ItemDaoPostgres implements ItemDao {
    Connection con;
    public ItemDaoPostgres(Connection con){ this.con = con; }

    @Override
    @Async
    public CompletableFuture<Boolean> insertItem(Item Item) {
        String query = "INSERT INTO items (name, type, description, location, image_base64, assigned_user) VALUES (?, ?, ?, ?, ?, ?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            settingItem(Item, st);
            int rowsAffected = st.executeUpdate();
            st.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Item>> findAll() {
        ArrayList<Item> items = new ArrayList<>();
        String query = "SELECT * FROM items";
        try (
                PreparedStatement st = this.con.prepareStatement(query);
                ResultSet rs = st.executeQuery())
        {
            while (rs.next()) {
                Item item = new ItemProxy(con);
                item.setIdItem(rs.getInt("id_item"));
                item.setName(rs.getString("name"));
                item.setType(rs.getString("type"));
                item.setImage(rs.getString("image_base64"));
                if(rs.getLong("assigned_user") != 0){
                    item.setAssignedUser(new User(rs.getLong("assigned_user")));
                }
                else{
                    item.setAssignedUser(null);
                }
                items.add(item);
            }
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(items);

    }
    @Override
    @Async
    public CompletableFuture<Item> findByPrimaryKey(Long id) {
        Item item = new ItemProxy(con);
        String query = "SELECT * FROM items WHERE id_item = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, id);
            try (ResultSet rs = st.executeQuery()) {
                if (rs.next()) {
                    item.setIdItem(rs.getInt("id_item"));
                    item.setName(rs.getString("name"));
                    item.setType(rs.getString("type"));
                    item.setImage(rs.getString("image_base64"));
                    if(rs.getLong("assigned_user") != 0){
                        item.setAssignedUser(new User(rs.getLong("assigned_user")));
                    }
                    else{
                            item.setAssignedUser(null);
                        }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(item);

    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Item>> findByName(String name) {
        ArrayList<Item> items = new ArrayList<>();
        String query = "SELECT * FROM items WHERE LOWER(name) LIKE LOWER(?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setString(1, "%" + name + "%");
            try (ResultSet rs = st.executeQuery()) {
                while (rs.next()) {
                    Item item = new Item();
                    item.setIdItem(rs.getInt("id_item"));
                    item.setName(rs.getString("name"));
                    item.setType(rs.getString("type"));
                    item.setDescription(rs.getString("description"));
                    item.setImage(rs.getString("image_base64"));
                    if(rs.getLong("assigned_user") != 0){
                        item.setAssignedUser(new User(rs.getLong("assigned_user")));
                    }
                    else{
                        item.setAssignedUser(null);
                    }
                    items.add(item);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(items);
    }


    @Override
    @Async
    public CompletableFuture<Boolean> updateItem(Item item) {
        String query = "UPDATE items SET name = ?, type = ?, description = ?, location = ?, image_base64 = ?, assigned_user = ? WHERE id_item = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setString(1, item.getName());
            st.setString(2, item.getType());
            st.setString(3, item.getDescription());
            st.setString(4, item.getLocation());
            st.setString(5, item.getImage());
            if(item.getAssignedUser() != null){
                st.setLong(6, item.getAssignedUser().getIdUser());
            }
            else{
                st.setLong(6, 0);
            }
            st.setLong(7, item.getIdItem());

            int rowsAffected = st.executeUpdate();
            st.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> deleteItem(Long id) {
        String deleteItemQuery = "DELETE FROM items WHERE id_item = ?";
        String deleteEmployeeRequestQuery = "DELETE FROM employee_request WHERE requested_item = ?";

        try (
                PreparedStatement deleteItemStatement = this.con.prepareStatement(deleteItemQuery);
                PreparedStatement deleteEmployeeRequestStatement = this.con.prepareStatement(deleteEmployeeRequestQuery)
        ) {
            // Set the item ID parameter for both queries
            deleteItemStatement.setLong(1, id);
            deleteEmployeeRequestStatement.setLong(1, id);

            // Execute the queries
            deleteEmployeeRequestStatement.executeUpdate();
            int rowsAffected = deleteItemStatement.executeUpdate();

            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    @Async
    public CompletableFuture<ArrayList<Item>> findByCategory(String category) {
        ArrayList<Item> items = new ArrayList<>();
        String query = "SELECT * FROM items WHERE LOWER(type) = LOWER(?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setString(1, category);
            try (ResultSet rs = st.executeQuery()) {
                while (rs.next()) {
                    Item item = new Item();
                    item.setIdItem(rs.getInt("id_item"));
                    item.setName(rs.getString("name"));
                    item.setType(rs.getString("type"));
                    item.setDescription(rs.getString("description"));
                    item.setImage(rs.getString("image_base64"));
                    if(rs.getLong("assigned_user") != 0){
                        item.setAssignedUser(new User(rs.getLong("assigned_user")));
                    }
                    else{
                        item.setAssignedUser(null);
                    }
                    items.add(item);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(items);
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Item>> findItemsByUser(long idUser) {
        ArrayList<Item> items = new ArrayList<>();
        String query = "SELECT * FROM items WHERE assigned_user = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, idUser);
            try (ResultSet rs = st.executeQuery()) {
                while (rs.next()) {
                    Item item = new ItemProxy(con);
                    item.setIdItem(rs.getInt("id_item"));
                    item.setName(rs.getString("name"));
                    item.setType(rs.getString("type"));
                    item.setDescription(rs.getString("description"));
                    item.setImage(rs.getString("image_base64"));
                    if(rs.getLong("assigned_user") != 0){
                        item.setAssignedUser(new User(rs.getLong("assigned_user")));
                    }
                    else{
                        item.setAssignedUser(null);
                    }
                    items.add(item);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(items);

    }


    private void settingItem(Item item, PreparedStatement st) throws SQLException {
        st.setString(1, item.getName());
        st.setString(2, item.getType());
        st.setString(3, item.getDescription());
        st.setString(4, item.getLocation());
        st.setString(5, item.getImage());
        if(item.getAssignedUser() != null){
            st.setLong(6, item.getAssignedUser().getIdUser());
        }
        else{
            st.setLong(6, 0);
        }
    }
}
