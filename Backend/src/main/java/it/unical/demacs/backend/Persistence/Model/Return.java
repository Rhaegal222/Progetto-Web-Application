package it.unical.demacs.backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class Return {
    private long idReturn;
    private User returningUser;
    private Item returnedItem;
    private Date returnDate;
    private String returnReason;
}
