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
    public ItemDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Item>> findAll() {
        ArrayList<Item> items = new ArrayList<>();
        String query = "SELECT * FROM items";
        try (
                PreparedStatement st = this.con.prepareStatement(query);
                ResultSet rs = st.executeQuery()) {
            while (rs.next()) {
                Item item = new Item();
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
        } catch (SQLException e) {
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
    public CompletableFuture<Item> findByName(String name) {
        Item item = new ItemProxy(con);
        String query = "SELECT * FROM items WHERE name = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setString(1, name);
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
    public CompletableFuture<Boolean> insertItem(Item Item) {
        String query = "INSERT INTO items (name, type, description, location, image_base64) VALUES (?, ?, ?, ?, ?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            settingItem(Item, st);
            st.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(true);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> updateItem(Item Item) {
        String query = "UPDATE items SET name = ?, type = ?, description = ?, location = ?, image_base64 = ? WHERE id_item = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            settingItem(Item, st);
            st.setInt(6, Item.getIdItem());
            st.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(true);
    }
    @Override
    public CompletableFuture<Boolean> deleteItem(Long id) {
        String query = "DELETE FROM items WHERE id_item = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, id);
            st.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(true);
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Item>> findByCategory(String category) {
        ArrayList<Item> items = new ArrayList<>();
        String query = "SELECT * FROM items WHERE type = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setString(1, category);
            try (ResultSet rs = st.executeQuery()) {
                while (rs.next()) {
                    Item item = new Item();
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
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(items);
    }




    private void settingItem(Item Item, PreparedStatement st) throws SQLException {
        st.setString(1, Item.getName());
        st.setString(2, Item.getType());
        st.setString(3, Item.getDescription());
        st.setString(4, Item.getLocation());
        st.setString(5, Item.getImage());
    }
}
