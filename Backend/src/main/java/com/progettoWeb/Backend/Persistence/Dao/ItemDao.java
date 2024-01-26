package com.progettoWeb.Backend.Persistence.Dao;

import com.progettoWeb.Backend.Persistence.Model.Item;

import java.util.ArrayList;

public interface ItemDao {
    public Item findByPrimaryKey(String id_item);

    void insertItem(Item item);
    void deleteItem(String id_item);

    ArrayList<Item> findAll();
}