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
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM employee_request");
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setTitle(rs.getString("title"));
                employeeRequest.setDescription(rs.getString("description"));
                employeeRequest.setStatus(rs.getString("status"));
                employeeRequest.setType(rs.getString("type"));
                employeeRequest.setDate(String.valueOf(rs.getDate("date")));
                employeeRequest.setAppointment(String.valueOf(rs.getDate("appointment")));
                employeeRequests.add(employeeRequest);
            }
        } catch (SQLException e) {
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
                String title = res.getString("title");
                String description = res.getString("description");
                String status = res.getString("status");
                String type = res.getString("type");
                String date = String.valueOf(res.getDate("request_date"));
                String appointment = String.valueOf(res.getDate("appointment"));
                employeeRequest = new EmployeeRequest(new User(requestingUser), new Item(requestedItem), title, description, status, type, date, appointment);
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
                employeeRequest.setTitle(rs.getString("title"));
                employeeRequest.setDescription(rs.getString("description"));
                employeeRequest.setStatus(rs.getString("status"));
                employeeRequest.setType(rs.getString("type"));
                employeeRequest.setDate(String.valueOf(rs.getDate("request_date")));
                employeeRequest.setAppointment(String.valueOf(rs.getDate("appointment")));
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
                String title = res.getString("title");
                String description = res.getString("description");
                String status = res.getString("status");
                String type = res.getString("type");
                String date = String.valueOf(res.getDate("request_date"));
                String appointment = String.valueOf(res.getDate("appointment"));
                employeeRequest = new EmployeeRequest(new User(requestingUser), new Item(requestedItem), title, description, status, type, date, appointment);
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
                employeeRequest.setTitle(rs.getString("title"));
                employeeRequest.setDescription(rs.getString("description"));
                employeeRequest.setStatus(rs.getString("status"));
                employeeRequest.setType(rs.getString("type"));
                employeeRequest.setDate(String.valueOf(rs.getDate("request_date")));
                employeeRequest.setAppointment(String.valueOf(rs.getDate("appointment")));
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
        String query = "INSERT INTO employee_request (requesting_user, requested_item, title, description, status, type, request_date, appointment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, employeeRequest.getRequestingUser().getIdUser());
            st.setLong(2, employeeRequest.getRequestedItem().getIdItem());
            st.setString(3, employeeRequest.getTitle());
            st.setString(4, employeeRequest.getDescription());
            st.setString(5, employeeRequest.getStatus());
            st.setString(6, employeeRequest.getType());
            st.setDate(7, Date.valueOf(employeeRequest.getDate()));
            st.setDate(8, Date.valueOf(employeeRequest.getAppointment()));
            int rowsAffected = st.executeUpdate();
            st.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
    }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> updateEmployeeRequest(EmployeeRequest employeeRequest) {
        String query = "UPDATE employee_request SET requesting_user = ?, requested_item = ?, title = ?, description = ?, status = ?, type = ?, request_date = ?, appointment = ? WHERE id_employee_request = ?";
        try (
                PreparedStatement st = this.con.prepareStatement(query)) {
            st.setLong(1, employeeRequest.getRequestingUser().getIdUser());
            st.setLong(2, employeeRequest.getRequestedItem().getIdItem());
            st.setString(3, employeeRequest.getTitle());
            st.setString(4, employeeRequest.getDescription());
            st.setString(5, employeeRequest.getStatus());
            st.setString(6, employeeRequest.getType());
            st.setDate(7, Date.valueOf(employeeRequest.getDate()));
            st.setDate(8, Date.valueOf(employeeRequest.getAppointment()));
            st.setLong(9, employeeRequest.getIdEmployeeRequest());
            int rowsAffected = st.executeUpdate();
            st.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
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

    @Override
    @Async
    public CompletableFuture<ArrayList<EmployeeRequest>> getRequestsByType(String type) {
        ArrayList<EmployeeRequest> employeeRequests = new ArrayList<>();
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE type = ?");
            stmt.setString(1, type);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setTitle(rs.getString("title"));
                employeeRequest.setDescription(rs.getString("description"));
                employeeRequest.setStatus(rs.getString("status"));
                employeeRequest.setType(rs.getString("type"));
                employeeRequest.setDate(String.valueOf(rs.getDate("request_date")));
                employeeRequest.setAppointment(String.valueOf(rs.getDate("appointment")));
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
    public CompletableFuture<ArrayList<EmployeeRequest>> getEmployeeRequestInRange(String start, String end) {
        ArrayList<EmployeeRequest> employeeRequests = new ArrayList<>();
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE request_date BETWEEN ?::date AND ?::date");
            stmt.setString(1, start);
            stmt.setString(2, end);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setTitle(rs.getString("title"));
                employeeRequest.setDescription(rs.getString("description"));
                employeeRequest.setStatus(rs.getString("status"));
                employeeRequest.setType(rs.getString("type"));
                employeeRequest.setDate(String.valueOf(rs.getDate("request_date")));
                employeeRequest.setAppointment(String.valueOf(rs.getDate("appointment")));
                employeeRequests.add(employeeRequest);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(employeeRequests);
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<EmployeeRequest>> getRequestsByStatus(String status) {
        ArrayList<EmployeeRequest> employeeRequests = new ArrayList<>();
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM employee_request WHERE status = ?");
            stmt.setString(1, status);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                EmployeeRequest employeeRequest = new EmployeeRequest();
                employeeRequest.setIdEmployeeRequest(rs.getLong("id_employee_request"));
                employeeRequest.setRequestingUser(new User(rs.getLong("requesting_user")));
                employeeRequest.setRequestedItem(new Item(rs.getLong("requested_item")));
                employeeRequest.setTitle(rs.getString("title"));
                employeeRequest.setDescription(rs.getString("description"));
                employeeRequest.setStatus(rs.getString("status"));
                employeeRequest.setType(rs.getString("type"));
                employeeRequest.setDate(String.valueOf(rs.getDate("request_date")));
                employeeRequest.setAppointment(String.valueOf(rs.getDate("appointment")));
                employeeRequests.add(employeeRequest);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return CompletableFuture.completedFuture(employeeRequests);
    }

}
