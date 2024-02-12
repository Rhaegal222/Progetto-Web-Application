package it.unical.demacs.backend.Service.Request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class SendReqRequest {
    long requestedItem;
    String requestingUser;
    String title;
    String description;
    String type;
    String date;
}
