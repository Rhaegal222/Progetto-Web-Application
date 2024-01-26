package com.progettoWeb.Backend.Persistence;


import com.progettoWeb.Backend.Persistence.Dao.Postgres.UserDaoPostgres;
import com.progettoWeb.Backend.Persistence.Dao.UserDao;

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

    public Connection getConnection(){
        if (con == null){
            try {
                con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/Riepilogo", "postgres", "postgres");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        return con;
    }

    public UserDao getUserDao(){
        return new UserDaoPostgres(getConnection());
    }
}
