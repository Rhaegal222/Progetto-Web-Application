package com.progettoWeb.Backend.Persistence.Dao.Postgres;

import com.progettoWeb.Backend.Persistence.Dao.UserDao;
import com.progettoWeb.Backend.Persistence.Model.User;

import java.sql.Connection;
import java.util.ArrayList;

public class UserDaoPostgres implements UserDao {

    Connection con;
    public UserDaoPostgres(Connection con){
        this.con = con;
    }
    @Override
    public ArrayList<User> findAll() {
        return null;
    }

    @Override
    public User findByPrimaryKey(String username) {
        return null;
    }

    @Override
    public void insertUser(User User) {

    }
}

