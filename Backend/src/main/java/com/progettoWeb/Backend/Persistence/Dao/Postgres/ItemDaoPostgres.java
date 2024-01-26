package com.progettoWeb.Backend.Persistence.Dao.Postgres;

import com.progettoWeb.Backend.Persistence.Dao.ItemDao;
import com.progettoWeb.Backend.Persistence.Model.Item;

import javax.imageio.ImageTranscoder;
import java.sql.Connection;

public class ItemDaoPostgres implements ItemDao{
    Connection con;
    public ItemDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    public Item findByPrimaryKey(String id_item) {
        return null;
    }

    @Override
    public void insertItem(Item item) {

    }

    @Override
    public void deleteItem(String id_item) {

    }
}
