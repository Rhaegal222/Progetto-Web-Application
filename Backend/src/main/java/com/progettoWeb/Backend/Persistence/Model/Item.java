package com.progettoWeb.Backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {
    private String name;
    private String description;
    private String type;
    private String quantity;
    //private String image;

    public Item(String name, String description, String type, String quantity) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.quantity = quantity;
    }
}
