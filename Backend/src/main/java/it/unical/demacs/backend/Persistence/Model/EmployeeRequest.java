package it.unical.demacs.backend.Persistence.Model;

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

    public EmployeeRequest(long idEmployeeRequest, User requestingUser, Item requestedItem, String requestContent, Date requestDate) {
        this.idEmployeeRequest = idEmployeeRequest;
        this.requestingUser = requestingUser;
        this.requestedItem = requestedItem;
        this.requestContent = requestContent;
        this.requestDate = requestDate;
    }

    public EmployeeRequest() {
    }

}
