package it.unical.demacs.backend.Service.Request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class SendReqRequest {
    String emailRequestingUser;
    long idRequestedItem;
    String requestContent;
    Date requestDate;
}
