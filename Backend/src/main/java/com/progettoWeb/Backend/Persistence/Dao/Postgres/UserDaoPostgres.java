package com.progettoWeb.Backend.Persistence.Dao.Postgres;

import com.progettoWeb.Backend.Persistence.Dao.UserDao;
import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Model.User;

import java.sql.*;
public class UserDaoPostgres implements UserDao {

    Connection con;
    public UserDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    public User findByPrimaryKey(String username) {
        try {
            con = DatabaseHandler.getInstance().getConnection();
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

                u = new User(name, surname, role, email, username, password);
            }

            res.close();
            stmt.close();
            DatabaseHandler.getInstance().closeConnection();
            return u;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

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
    public void insertUser(User user) {
        try {
            con = DatabaseHandler.getInstance().getConnection();
            String query =  "INSERT INTO users (name, surname, role, email, username, password) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement stmt = con.prepareStatement(query);

            // Impostare i parametri della query con i dati dell'utente
            stmt.setString(1, user.getName());
            stmt.setString(2, user.getSurname());
            stmt.setString(3, user.getRole());
            stmt.setString(4, user.getEmail());
            stmt.setString(5, user.getUsername());
            stmt.setString(6, user.getPassword());

            // Eseguire la query di inserimento
            stmt.executeUpdate();

            // Chiudere le risorse
            stmt.close();
            DatabaseHandler.getInstance().closeConnection();

        } catch (SQLException e) {
            e.fillInStackTrace();
        }
    }

    @Override
    public void deleteUser(String id_user) {

    }

}

