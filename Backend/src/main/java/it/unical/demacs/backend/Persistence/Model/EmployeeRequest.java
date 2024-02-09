package it.unical.demacs.backend.Persistence.Model;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class EmployeeRequest {
    private long idEmployeeRequest;
    private User requestingUser;
    private Item requestedItem;
    private String title;
    private String description;
    private String status;
    private String type;
    private String date;
    private String appointment;

    public EmployeeRequest(User requestingUser, Item requestedItem, String title, String description, String status, String type, String date, String appointment) {
        this.requestingUser = requestingUser;
        this.requestedItem = requestedItem;
        this.title = title;
        this.description = description;
        this.status = status;
        this.type = type;
        this.date = date;
        this.appointment = appointment;
    }

    public EmployeeRequest() {
    }

    public EmployeeRequest(long idEmployeeRequest) {
        EmployeeRequest e = DatabaseHandler.getInstance().getEmployeeRequestDao().findByPrimaryKey(idEmployeeRequest).join();
        this.idEmployeeRequest = e.getIdEmployeeRequest();
        this.requestingUser = e.getRequestingUser();
        this.requestedItem = e.getRequestedItem();
        this.title = e.getTitle();
        this.description = e.getDescription();
        this.status = e.getStatus();
        this.type = e.getType();
        this.date = e.getDate();
        this.appointment = e.getAppointment();
    }
}
