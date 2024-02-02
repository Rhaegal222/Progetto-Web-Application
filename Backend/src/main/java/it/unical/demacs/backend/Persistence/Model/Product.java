package it.unical.demacs.backend.Persistence.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product {
    private Integer idProduct;
    private String name;
    private String type;
    private String description;
    private String location;
    private String category;
    private String image;

    public Product() {}


    public Product(String name, String type, String description, String location, String category, String image) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.location = location;
        this.category = category;
        this.image = image;
    }

}
