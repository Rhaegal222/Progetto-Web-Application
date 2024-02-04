package it.unical.demacs.backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {
    private Integer idItem;
    private String name;
    private String type;
    private String description;
    private String location;
    private String image;
    private User assignedUser;

    public Item() {}


    public Item(String name, String type, String description, String location, String image, User assignedUser) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.location = location;
        this.image = image;
        this.assignedUser = assignedUser;
    }

}
