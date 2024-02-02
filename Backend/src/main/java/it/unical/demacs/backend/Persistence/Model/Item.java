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

    public Item() {}


    public Item(String name, String type, String description, String location, String image) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.location = location;
        this.image = image;
    }

}
