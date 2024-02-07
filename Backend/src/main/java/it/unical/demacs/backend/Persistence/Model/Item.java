package it.unical.demacs.backend.Persistence.Model;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Item {
    private long idItem;
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

    public Item(long requestedItem) {
        Item i = DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(requestedItem).join();
        this.idItem = i.getIdItem();
        this.name = i.getName();
        this.type = i.getType();
        this.description = i.getDescription();
        this.location = i.getLocation();
        this.image = i.getImage();
        this.assignedUser = i.getAssignedUser();
    }
}
