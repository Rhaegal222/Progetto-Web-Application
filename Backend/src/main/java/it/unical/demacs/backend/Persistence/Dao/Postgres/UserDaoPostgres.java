package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.UserDao;
import it.unical.demacs.backend.Persistence.Model.User;
import org.springframework.scheduling.annotation.Async;

import java.sql.*;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class UserDaoPostgres implements UserDao {

    Connection con;
    public UserDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<User>> findAll() {
        ArrayList<User> users = new ArrayList<>();
        String query = "SELECT * FROM users";
        try (
                Statement st = this.con.createStatement();
                ResultSet rs = st.executeQuery(query)) {
            while (rs.next()) {
                User user = new User();
                setting(rs, user);
                users.add(user);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(users);
    }

    private void setting(ResultSet rs, User user) throws SQLException {
        user.setPassword(rs.getString(1));
        user.setName(rs.getString(2));
        user.setSurname(rs.getString(3));
        user.setEmail(rs.getString(4));
        user.setRole(rs.getString(5));
        user.setUsername(rs.getString(6));
    }


    @Override
    @Async
    public CompletableFuture<User> findByPrimaryKey(String username) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM users WHERE username = ?");
            stmt.setString(1, username);
            ResultSet res = stmt.executeQuery();

            User u = null;
            if (res.next()) {
                String name = res.getString("name");
                String surname = res.getString("surname");
                String role = res.getString("role");
                String password = res.getString("password");
                String email = res.getString("email");

                u = new User(name, surname, email, username, password);
                u.setRole(role);
            }

            res.close();
            stmt.close();
            return CompletableFuture.completedFuture(u);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<User> findByEmail(String email) {
        User user = new User();
        String query = "SELECT * FROM users WHERE email = ?";
        try {
            PreparedStatement st = this.con.prepareStatement(query);
            st.setString(1, email);
            ResultSet rs = st.executeQuery();
            if (rs.next()) {
                setting(rs, user);
            }
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(user);
    }

    @Override
    public boolean checkUsername(String username){
        try{
            boolean output = false;
            PreparedStatement stmt = con.prepareStatement("SELECT username FROM users WHERE username = ?");
            stmt.setString(1, username);
            ResultSet res = stmt.executeQuery();

            if(res.next()) output = true;

            res.close();
            stmt.close();
            return output;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean checkEmail(String email) {
        try{
            boolean output = false;
            PreparedStatement stmt = con.prepareStatement("SELECT email FROM users WHERE email = ?");
            stmt.setString(1, email);
            ResultSet res = stmt.executeQuery();

            if(res.next()) output = true;

            res.close();
            stmt.close();
            return output;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String selectPassword(String username) {
        try{
            String output = "";
            PreparedStatement stmt = con.prepareStatement("SELECT password FROM users WHERE username = ?");
            stmt.setString(1, username);
            ResultSet res = stmt.executeQuery();

            if(res.next()) output = res.getString("password");

            res.close();
            stmt.close();
            return output;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<Boolean> insertUser(User user) {
        String query =  "INSERT INTO users (username, password, email, name, surname) VALUES (?, ?, ?, ?, ?)";
        try {
            PreparedStatement stmt = con.prepareStatement(query);
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getName());
            stmt.setString(5, user.getSurname());

            int rowsAffected = stmt.executeUpdate();
            stmt.close();

            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> deleteUser(String username) {
        String query = "DELETE FROM users WHERE username = ?";
        try {
            PreparedStatement st = this.con.prepareStatement(query);
            st.setString(1, username);
            st.executeUpdate();
            int rowsAffected = st.executeUpdate();
            st.close();

            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException ignored) {}

        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> updateUser(String username) {

        return null;
    }


}

