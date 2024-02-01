package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Service.Request.GetItemRequest;
import it.unical.demacs.backend.Service.Request.InsertItemRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.SQLException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class ItemService {

    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        String name = insertItemRequest.getName();
        String type = insertItemRequest.getType();
        String description = insertItemRequest.getDescription();
        String location = insertItemRequest.getLocation();
        String category = insertItemRequest.getCategory();
        String image = insertItemRequest.getImage();

        try {
            // Check if the item already exists by name
            CompletableFuture<Item> existingItemFuture = DatabaseHandler.getInstance().getItemDao().findByName(name);
            Item existingItem = existingItemFuture.get();

            if (existingItem.getIdItem() != null) {
                // Item with the same name already exists, return an error response
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Item with name '" + name + "' already exists.");
            }

            // Item doesn't exist, proceed with insertion
            Item newItem = new Item();
            newItem.setName(name);
            newItem.setType(type);
            newItem.setDescription(description);
            newItem.setLocation(location);
            newItem.setCategory(category);
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
    }

    public ResponseEntity<?> allItems() {
        return ResponseEntity.ok().body(DatabaseHandler.getInstance().getItemDao().findAll());
    }

    public ResponseEntity<?> getItem(@RequestBody GetItemRequest getItemRequest) throws ExecutionException, InterruptedException {
        CompletableFuture<Item> existingItemFuture = DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(getItemRequest.getIdItem());
        Item existingItem = existingItemFuture.get();

        if (existingItem.getIdItem() == null) {
            // Item with the same name already exists, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Item doesn't exists.");
        } else {
            return ResponseEntity.ok().body(DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(getItemRequest.getIdItem()));
        }
    }
}
