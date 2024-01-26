package com.progettoWeb.Backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {
    private String name;
    private String description;
    private String type;
    private Integer quantity;
    //private String image;

    public Item(String name, String description, String type, Integer quantity) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.quantity = quantity;
    }
}
