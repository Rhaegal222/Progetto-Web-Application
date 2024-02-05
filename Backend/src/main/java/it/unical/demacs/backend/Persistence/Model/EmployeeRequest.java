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


}
