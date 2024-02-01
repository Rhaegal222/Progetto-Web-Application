package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ItemDao;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Item;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;

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
        try {
            //String name, String description, String type, String quantity
            con = DatabaseHandler.getInstance().getConnection();
            PreparedStatement stmt = con.prepareStatement(
                    "INSERT INTO items (name, description, type, quantity) VALUES (?, ?, ?, ?)"
            );
            // Impostare i parametri della query con i dati dell'utente
            stmt.setString(1, item.getName());
            stmt.setString(2, item.getDescription());
            stmt.setString(3, item.getType());
            stmt.setInt(4, item.getQuantity());

            // Eseguire la query di inserimento
            stmt.executeUpdate();

            // Chiudere le risorse
            stmt.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteItem(String id_item) {

    }

    @Override
    public ArrayList<Item> findAll() {
        return null;
    }
}
