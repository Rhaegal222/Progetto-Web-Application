package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.Dao.Postgres.ItemProxy;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Service.Request.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@Service
public class ItemService {

    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        String name = insertItemRequest.getName();
        String type = insertItemRequest.getType();
        String description = insertItemRequest.getDescription();
        String location = insertItemRequest.getLocation();
        String image = insertItemRequest.getImage();

        try {
            DatabaseHandler.getInstance().openConnection();

            Item  existingItem = DatabaseHandler.getInstance().getItemDao().findByName(name).join();

            if (existingItem.getIdItem() != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Item with name '" + name + "' already exists.");
            }

            Item newItem = new Item();
            newItem.setName(name);
            newItem.setType(type);
            newItem.setDescription(description);
            newItem.setLocation(location);
            newItem.setImage(image);

            CompletableFuture<Boolean> insertResult = DatabaseHandler.getInstance().getItemDao().insertItem(newItem);

            if (insertResult.get()) {
                // Item inserted successfully
                return ResponseEntity.status(HttpStatus.OK).body("Item inserted successfully.");
            } else {
                // Failed to insert item
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to insert item.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the request: " + e.getMessage());
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> allItems() {
        try{
            DatabaseHandler.getInstance().openConnection();
            ArrayList<Item> items = DatabaseHandler.getInstance().getItemDao().findAll().join();
            return ResponseEntity.ok().body(items);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }

    }

    public ResponseEntity<?> searchItems(String search, String category) {
        try{
            DatabaseHandler.getInstance().openConnection();
            ArrayList<Item> items = DatabaseHandler.getInstance().getItemDao().findByCategory(category).join();
            ArrayList<Item> result = new ArrayList<>();
            if (!Objects.equals(search, "")) {
                for (Item item : items) {
                    String name = item.getName().toLowerCase();
                    String description = item.getDescription().toLowerCase();
                    String searchLower = search.toLowerCase();
                    if (name.contains(searchLower) || description.contains(searchLower)) {
                        result.add(item);
                    }
                }
            } else {
                result.addAll(items);
            }
            return ResponseEntity.ok().body(result);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> getItemProxy(@RequestBody GetItemRequest getItemRequest) {
        try {
            DatabaseHandler.getInstance().openConnection();
            long idItem = getItemRequest.getIdItem();
            ItemProxy item = (ItemProxy) DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(idItem).join();
            if (item == null) {
                return ResponseEntity.badRequest().body("{\"message\": \"No item found\"}");
            } else {
                String description = (item.getDescription() != null) ? item.getDescription() : "";
                String location = (item.getLocation() != null) ? item.getLocation() : "";
                String responseBody = "{\"description\": \"" + description +
                        "\", \"location\": \"" + location + "\"}";

                return ResponseEntity.ok(responseBody);
            }
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }

    }

    public ResponseEntity<?> searchItem(@RequestBody SearchItemRequest searchItemRequest) {
        try{
            DatabaseHandler.getInstance().openConnection();
            String category = searchItemRequest.getCategory();
            String fieldContent = searchItemRequest.getFieldContent();
            ArrayList<Item> items;
            if(category.equals("all")){
                items = DatabaseHandler.getInstance().getItemDao().findAll().join();
            }
            else{
                items = DatabaseHandler.getInstance().getItemDao().findByCategory(category).join();
            }

            for (Item item : items) {
                if (item.getName().contains(fieldContent) || item.getDescription().contains(fieldContent)) {
                    return ResponseEntity.ok().body(item);
                }
            }

            return ResponseEntity.badRequest().body("No item found");
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }

    }
}
