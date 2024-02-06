package it.unical.demacs.backend.Persistence.Dao.Postgres;

import it.unical.demacs.backend.Persistence.Dao.ReturnsDao;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.Returns;
import it.unical.demacs.backend.Persistence.Model.User;
import org.springframework.scheduling.annotation.Async;

import java.sql.*;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class ReturnsDaoPostgres implements ReturnsDao {
    Connection con;
    public ReturnsDaoPostgres(Connection con){
        this.con = con;
    }

    @Override
    @Async
    public CompletableFuture<ArrayList<Returns>> findAll() {
        ArrayList<Returns> returns = new ArrayList<>();
        try{
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM returns");
            ResultSet rs = stmt.executeQuery();
            while(rs.next()){
                Returns ret = new Returns();
                ret.setIdReturn(rs.getLong("id_return"));
                ret.setReturningUser(new User(rs.getLong("returning_user")));
                ret.setReturnedItem(new Item(rs.getLong("returned_item")));
                ret.setReturnDate(rs.getDate("return_date"));
                ret.setReturnReason(rs.getString("return_reason"));
                returns.add(ret);
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }

        return CompletableFuture.completedFuture(returns);
    }


    @Override
    @Async
    public CompletableFuture<Returns> findByPrimaryKey(Long id) {
        try {

            PreparedStatement stmt = con.prepareStatement("SELECT * FROM returns WHERE id_return = ?");
            stmt.setLong(1,id);
            ResultSet rs = stmt.executeQuery();

            Returns ret = new Returns();
            if (rs.next()) {
                ret.setIdReturn(rs.getLong("id_return"));
                ret.setReturningUser(new User(rs.getLong("returning_user")));
                ret.setReturnedItem(new Item(rs.getLong("returned_item")));
                ret.setReturnDate(rs.getDate("return_date"));
                ret.setReturnReason(rs.getString("return_reason"));
            }
            return CompletableFuture.completedFuture(ret);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    @Async
    public CompletableFuture<Returns> findByUser(Long id) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM returns WHERE returning_user = ?");
            stmt.setLong(1,id);
            ResultSet rs = stmt.executeQuery();

            Returns ret = new Returns();
            if (rs.next()) {
                ret.setIdReturn(rs.getLong("id_return"));
                ret.setReturningUser(new User(rs.getLong("returning_user")));
                ret.setReturnedItem(new Item(rs.getLong("returned_item")));
                ret.setReturnDate(rs.getDate("return_date"));
                ret.setReturnReason(rs.getString("return_reason"));
            }
            return CompletableFuture.completedFuture(ret);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<Returns> findByItem(Long id) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM returns WHERE returned_item = ?");
            stmt.setLong(1,id);
            ResultSet rs = stmt.executeQuery();

            Returns ret = new Returns();
            if (rs.next()) {
                ret.setIdReturn(rs.getLong("id_return"));
                ret.setReturningUser(new User(rs.getLong("returning_user")));
                ret.setReturnedItem(new Item(rs.getLong("returned_item")));
                ret.setReturnDate(rs.getDate("return_date"));
                ret.setReturnReason(rs.getString("return_reason"));
            }
            return CompletableFuture.completedFuture(ret);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<Returns> findByDate(Date returnDate) {
        try {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM returns WHERE return_date = ?");
            stmt.setDate(1,returnDate);
            ResultSet rs = stmt.executeQuery();

            Returns ret = new Returns();
            if (rs.next()) {
                ret.setIdReturn(rs.getLong("id_return"));
                ret.setReturningUser(new User(rs.getLong("returning_user")));
                ret.setReturnedItem(new Item(rs.getLong("returned_item")));
                ret.setReturnDate(rs.getDate("return_date"));
                ret.setReturnReason(rs.getString("return_reason"));
            }
            return CompletableFuture.completedFuture(ret);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Async
    public CompletableFuture<Boolean> insertReturn(Returns ret) {
        try {
            PreparedStatement stmt = con.prepareStatement("INSERT INTO returns (returning_user, returned_item, return_date, return_reason) VALUES (?,?,?,?)");
            stmt.setLong(1, ret.getReturningUser().getIdUser());
            stmt.setLong(2, ret.getReturnedItem().getIdItem());
            stmt.setDate(3, ret.getReturnDate());
            stmt.setString(4, ret.getReturnReason());
            stmt.executeUpdate();
            int rowsAffected = stmt.executeUpdate();
            stmt.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> updateReturn(Returns ret) {
        try {
            PreparedStatement stmt = con.prepareStatement("UPDATE returns SET returning_user = ?, returned_item = ?, return_date = ?, return_reason = ? WHERE id_return = ?");
            stmt.setLong(1, ret.getReturningUser().getIdUser());
            stmt.setLong(2, ret.getReturnedItem().getIdItem());
            stmt.setDate(3, ret.getReturnDate());
            stmt.setString(4, ret.getReturnReason());
            stmt.setLong(5, ret.getIdReturn());
            int rowsAffected = stmt.executeUpdate();
            stmt.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }

    @Override
    @Async
    public CompletableFuture<Boolean> deleteReturn(Long id) {
        try {
            PreparedStatement stmt = con.prepareStatement("DELETE FROM returns WHERE id_return = ?");
            stmt.setLong(1, id);
            int rowsAffected = stmt.executeUpdate();
            stmt.close();
            return CompletableFuture.completedFuture(rowsAffected > 0);
        } catch (SQLException e) {
            e.fillInStackTrace();
        }
        return CompletableFuture.completedFuture(false);
    }
}
