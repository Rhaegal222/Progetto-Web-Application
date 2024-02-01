package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.UserDao;
import it.unical.demacs.backend.Persistence.Model.User;

import java.sql.*;
public class UserDaoPostgres implements UserDao {

    Connection con;
    public UserDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    public User findByPrimaryKey(String username) {
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

                u = new User(name, surname, role, email, username, password);
            }

            res.close();
            stmt.close();
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
    public boolean insertUser(User user) {
        boolean done = false;
        try {
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
            System.out.println("PRIMA DELL'INSERT");
            stmt.executeUpdate();
            stmt.close();
            done = true;
            System.out.println("DOPO L'INSERT");

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return done;
    }

    @Override
    public void deleteUser(String id_user) {

    }

}

