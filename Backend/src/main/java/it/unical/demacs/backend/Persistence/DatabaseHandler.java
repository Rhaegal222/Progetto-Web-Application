package it.unical.demacs.backend.Persistence;


import it.unical.demacs.backend.Persistence.Dao.ItemDao;
import it.unical.demacs.backend.Persistence.Dao.Postgres.ItemDaoPostgres;
import it.unical.demacs.backend.Persistence.Dao.Postgres.UserDaoPostgres;
import it.unical.demacs.backend.Persistence.Dao.UserDao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseHandler {
    private static DatabaseHandler instance = null;

    private DatabaseHandler(){}

    public static DatabaseHandler getInstance(){
        if (instance == null){
            instance = new DatabaseHandler();
        }
        return instance;
    }

    Connection con = null;

    public void closeConnection(){
        try{
            con.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public Connection getConnection(){
        if (con == null){
            try {
                con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/InventoryDB", "postgres", "postgres");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return con;
    }

    public UserDao getUserDao(){
        return new UserDaoPostgres(getConnection());
    }
    public ItemDao getItemDao(){
        return new ItemDaoPostgres(getConnection());
    }
}
