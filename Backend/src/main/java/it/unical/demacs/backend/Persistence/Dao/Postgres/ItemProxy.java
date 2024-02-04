package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ItemProxy extends Item {
    Connection con;

    public ItemProxy(Connection con){
        this.con = con;
    }

    @Override
    public String getDescription(){
        if(super.getDescription() == null){
            String query = "SELECT description FROM items WHERE id_item = ?";
            try (
                    PreparedStatement st = this.con.prepareStatement(query)) {
                st.setLong(1, getIdItem());
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                       super.setDescription(rs.getString(1));
                       return rs.getString(1);
                    }
                }
            } catch (SQLException e) {
                e.fillInStackTrace();
            }
        }
        return super.getDescription();
    }

    @Override
    public String getLocation(){
        if(super.getLocation() == null){
            String query = "SELECT location FROM items WHERE id_item = ?";
            try (
                    PreparedStatement st = this.con.prepareStatement(query)) {
                st.setLong(1, getIdItem());
                try (ResultSet rs = st.executeQuery()) {
                    if (rs.next()) {
                       super.setLocation(rs.getString(1));
                       return rs.getString(1);
                    }
                }
            } catch (SQLException e) {
                e.fillInStackTrace();
            }
        }
        return super.getLocation();
    }

}
