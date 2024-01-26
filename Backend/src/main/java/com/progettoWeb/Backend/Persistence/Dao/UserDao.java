package com.progettoWeb.Backend.Persistence.Dao;

import com.progettoWeb.Backend.Persistence.Model.User;

import java.util.ArrayList;

public interface UserDao {
    public ArrayList<User> findAll();
    public User findByPrimaryKey(String username);

    public void insertUser(User User);
}
