package it.unical.demacs.backend.Service.Request;

import it.unical.demacs.backend.Persistence.Model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModifyRequest {
    private long idItem;
    private long idAssignedUser;
    private String name;
    private String type;
    private String description;
    private String location;
    private String image;
}
