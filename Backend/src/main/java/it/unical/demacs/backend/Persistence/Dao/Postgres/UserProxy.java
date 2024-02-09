package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;

import java.sql.Connection;
import java.text.CompactNumberFormat;
import java.util.ArrayList;

public class UserProxy extends User {
    Connection con;

    public UserProxy(Connection con){
        this.con = con;
    }

    @Override
    public ArrayList<Item> getItems() {
        if(super.getItems() == null){
            super.setItems(new ArrayList<>());
            String query = "SELECT id_item FROM items WHERE assigned_user = ?";
            try {
                var st = this.con.prepareStatement(query);
                st.setLong(1, getIdUser());
                var rs = st.executeQuery();
                while (rs.next()) {
                    var item = DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(rs.getLong(1)).join();
                    super.getItems().add(item);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return super.getItems();
    }

    @Override
    public ArrayList<EmployeeRequest> getEmployeeRequests() {
        if(super.getEmployeeRequests() == null){
            super.setEmployeeRequests(new ArrayList<>());
            String query = "SELECT id_employee_request FROM employee_requests WHERE user = ?";
            try {
                var st = this.con.prepareStatement(query);
                st.setLong(1, getIdUser());
                var rs = st.executeQuery();
                while (rs.next()) {
                    var employeeRequest = DatabaseHandler.getInstance().getEmployeeRequestDao().findByPrimaryKey(rs.getLong(1)).join();
                    super.getEmployeeRequests().add(employeeRequest);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return super.getEmployeeRequests();
    }
}

