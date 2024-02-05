package it.unical.demacs.backend.Persistence.Model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {
    private long idEmployeeRequest;
    private long idUser;
    private long idItem;
    private String requestContent;
    private Data requestDate;


}
