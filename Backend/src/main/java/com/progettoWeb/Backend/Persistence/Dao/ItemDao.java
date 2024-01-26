package com.progettoWeb.Backend.Persistence.Dao;

import com.progettoWeb.Backend.Persistence.Model.Item;
public interface ItemDao {
    public Item findByPrimaryKey(String id_item);

    void insertItem(Item item);
    void deleteItem(String id_item);
}