package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.EmployeeRequestDao;
import it.unical.demacs.backend.Persistence.Model.EmployeeRequest;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import org.springframework.scheduling.annotation.Async;

import java.sql.*;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class EmployeeRequestDaoPostgres implements EmployeeRequestDao {
    Connection con;
    public EmployeeRequestDaoPostgres(Connection con){
        this.con = con;
    }
    @Override
    @Async
    public CompletableFuture<ArrayList<EmployeeRequest>> findAll() {
        ArrayList<EmployeeRequest> employeeRequests = new ArrayList<>();
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setRequestDate(rs.getDate("request_date"));
                employeeRequests.add(employeeRequest);
            }
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(employeeRequests);
    }


    @Override
    @Async
    public CompletableFuture<EmployeeRequest> findByPrimaryKey(Long id) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE id_employee_request = ?");
            stmt.setLong(1, id);
            ResultSet res = stmt.executeQuery();

            EmployeeRequest employeeRequest = new EmployeeRequest();
            if (res.next()) {
                long idEmployeeRequest = res.getLong("id_employee_request");
                long requestingUser = res.getLong("requesting_user");
                long requestedItem = res.getLong("requested_item");
                String requestContent = res.getString("request_content");
                Date requestDate = res.getDate("request_date");
                employeeRequest = new EmployeeRequest(new User(requestingUser), new Item(requestedItem), requestContent, requestDate);
                employeeRequest.setIdEmployeeRequest(idEmployeeRequest);
            }
            return CompletableFuture.completedFuture(employeeRequest);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<EmployeeRequest>> findByUser(Long id) {
        ArrayList<EmployeeRequest> employeeRequests = new ArrayList<>();
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE requesting_user = ?");
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setRequestContent(rs.getString("request_content"));
                employeeRequest.setRequestDate(rs.getDate("request_date"));
                employeeRequests.add(employeeRequest);
            }
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(employeeRequests);
    }

    @Override
    @Async
    public CompletableFuture<EmployeeRequest> findByItem(Long id) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE requested_item = ?");
            stmt.setLong(1, id);
            ResultSet res = stmt.executeQuery();

            EmployeeRequest employeeRequest = new EmployeeRequest();
            if (res.next()) {
                long idEmployeeRequest = res.getLong("id_employee_request");
                long requestingUser = res.getLong("requesting_user");
                long requestedItem = res.getLong("requested_item");
                String requestContent = res.getString("request_content");
                Date requestDate = res.getDate("request_date");
                employeeRequest = new EmployeeRequest(new User(requestingUser), new Item(requestedItem), requestContent, requestDate);
                employeeRequest.setIdEmployeeRequest(idEmployeeRequest);
            }
            return CompletableFuture.completedFuture(employeeRequest);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<EmployeeRequest>> findByDate(Date requestDate) {
        ArrayList<EmployeeRequest> employeeRequests = new ArrayList<>();
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE request_date = ?");
            stmt.setDate(1, requestDate);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setRequestContent(rs.getString("request_content"));
                employeeRequest.setRequestDate(rs.getDate("request_date"));
                employeeRequests.add(employeeRequest);
            }
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(employeeRequests);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> insertEmployeeRequest(EmployeeRequest employeeRequest) {
        String query = "INSERT INTO employee_request (requesting_user, requested_item, request_content, request_date) VALUES (?, ?, ?, ?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, employeeRequest.getRequestingUser().getIdUser());
            st.setLong(2, employeeRequest.getRequestedItem().getIdItem());
            st.setString(3, employeeRequest.getRequestContent());
            st.setDate(4, employeeRequest.getRequestDate());
            int rowsAffected = st.executeUpdate();
            st.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    public CompletableFuture<Boolean> updateEmployeeRequest(EmployeeRequest employeeRequest) {
        return null;
    }

    @Override
    @Async
    public CompletableFuture<Boolean> deleteEmployeeRequest(Long id) {
        String query = "DELETE FROM employee_request WHERE id_employee_request = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, id);
            int rowsAffected = st.executeUpdate();
            st.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
    }
        return CompletableFuture.completedFuture(false);
    }
}
