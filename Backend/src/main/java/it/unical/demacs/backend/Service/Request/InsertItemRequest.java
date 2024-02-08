package it.unical.demacs.backend.Service.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsertItemRequest {
    private String name;
    private String type;
    private String description;
    private String location;
    private String image;
    private String assignedUser;
}
