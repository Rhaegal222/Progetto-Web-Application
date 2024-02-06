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
    private String requestContent;
    private Date requestDate;

    public EmployeeRequest(User requestingUser, Item requestedItem, String requestContent, Date requestDate) {
        this.requestingUser = requestingUser;
        this.requestedItem = requestedItem;
        this.requestContent = requestContent;
        this.requestDate = requestDate;
    }

    public EmployeeRequest() {
    }

    public EmployeeRequest(long idEmployeeRequest) {
        EmployeeRequest e = DatabaseHandler.getInstance().getEmployeeRequestDao().findByPrimaryKey(idEmployeeRequest).join();
        this.idEmployeeRequest = e.getIdEmployeeRequest();
        this.requestingUser = e.getRequestingUser();
        this.requestedItem = e.getRequestedItem();
        this.requestContent = e.getRequestContent();
        this.requestDate = e.getRequestDate();
    }
}
