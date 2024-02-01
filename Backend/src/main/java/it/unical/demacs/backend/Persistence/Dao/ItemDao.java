package it.unical.demacs.backend.Persistence.Dao;

import it.unical.demacs.backend.Persistence.Model.Item;

import java.util.ArrayList;

public interface ItemDao {
    public Item findByPrimaryKey(String id_item);

    void insertItem(Item item);
    void deleteItem(String id_item);

    ArrayList<Item> findAll();
}