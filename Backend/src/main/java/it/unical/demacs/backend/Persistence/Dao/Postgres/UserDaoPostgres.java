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

    private void setting(ResultSet rs, User user) throws SQLException {
        user.setIdUser(rs.getLong("id_user"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setName(rs.getString("name"));
        user.setSurname(rs.getString("surname"));
        user.setRole(rs.getString("role"));
        user.setBanned(rs.getBoolean("banned"));
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
    @Override
    @Async
    public CompletableFuture<User> findByPrimaryKey(long idUser) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM users WHERE id_user = ?");
            stmt.setLong(1, idUser);
            ResultSet res = stmt.executeQuery();

            User u = null;
            if (res.next()) {
                String email = res.getString("email");
                String password = res.getString("password");
                String name = res.getString("name");
                String surname = res.getString("surname");
                String role = res.getString("role");
                boolean banned = res.getBoolean("banned");

                u = new User(password, email, name, surname, banned);
                u.setIdUser(idUser);
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
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM users WHERE email = ?");
            stmt.setString(1, email);
            ResultSet res = stmt.executeQuery();

            User u = null;
            if (res.next()) {
                long idUser = res.getLong("id_user");
                String password = res.getString("password");
                String name = res.getString("name");
                String surname = res.getString("surname");
                String role = res.getString("role");
                boolean banned = res.getBoolean("banned");

                u = new User(password, email, name, surname, banned);
                u.setIdUser(idUser);
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
    public String autoIncrement() {
        String query = "SELECT COUNT(*) FROM users";
        try {
            Statement st = this.con.createStatement();
            ResultSet rs = st.executeQuery(query);
            rs.next();
            int count = rs.getInt(1);
            rs.close();
            st.close();
            return "U" + count;
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return "U" + 0;
    }

    @Override
    @Async
    public CompletableFuture<Boolean> insertUser(User user) {
        String query = "INSERT INTO users (email, password, name, surname, banned) VALUES (?, ?, ?, ?, ?)";
        try {
            PreparedStatement st = this.con.prepareStatement(query);
            st.setString(1, user.getEmail());
            st.setString(2, user.getPassword());
            st.setString(3, user.getName());
            st.setString(4, user.getSurname());
            st.setBoolean(5, user.getBanned());

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
    public CompletableFuture<Boolean> deleteUser(String username) {
        return null;
    }

    @Override
    @Async
    public void banningUser(String email) {
        String query = "UPDATE users SET banned = ? WHERE email = ?";
        try {
            PreparedStatement st = this.con.prepareStatement(query);
            st.setBoolean(1, true);
            st.setString(2, email);

            int rowsAffected = st.executeUpdate();
            st.close();

            CompletableFuture.completedFuture(rowsAffected > 0);
            return;
        } catch (SQLException e) {
            e.printStackTrace();  // In una situazione di produzione, gestire l'eccezione in modo appropriato
        }
        CompletableFuture.completedFuture(false);
    }


}

