package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.Dao.Postgres.ItemProxy;
import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Persistence.Model.User;
import it.unical.demacs.backend.Service.Request.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.xml.crypto.Data;
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
        String emailUser = insertItemRequest.getEmailUser();

        try {
            DatabaseHandler.getInstance().openConnection();
            boolean exisitingUser = DatabaseHandler.getInstance().getUserDao().checkEmail(emailUser);
            if(!exisitingUser){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User with email '" + emailUser + "' does not exist.");
            }

            if(name == null || type == null || description == null || location == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("All fields are required.");
            }

            Item newItem = new Item();
            newItem.setName(name);
            newItem.setType(type);
            newItem.setDescription(description);
            newItem.setLocation(location);
            newItem.setImage(image);
            newItem.setAssignedUser(DatabaseHandler.getInstance().getUserDao().findByEmail(emailUser).join());

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
            ArrayList<Item> items;
            ArrayList<Item> result = new ArrayList<>();

            if(category.isEmpty()){
                items = DatabaseHandler.getInstance().getItemDao().findAll().join();
            }
            else{
                items = DatabaseHandler.getInstance().getItemDao().findByCategory(category).join();
            }

            if (!search.isEmpty()) {
                for (Item item : items) {
                    String name = item.getName().toLowerCase();
                    String description = item.getDescription().toLowerCase();
                    String searchLower = search.toLowerCase();
                    if (name.contains(searchLower) || description.contains(searchLower)) {
                        result.add(item);
                    }
                }
            }
            else {
                result.addAll(items);
            }
            return ResponseEntity.ok().body(result);
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> getItemProxy(@RequestBody long idItem) {
        try {
            DatabaseHandler.getInstance().openConnection();
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

    public ResponseEntity<?> modifyRequest(ModifyRequest modifyRequest) {
        try{
            DatabaseHandler.getInstance().openConnection();
            Item itemToModify = new Item(modifyRequest.getIdItem());
            String name = modifyRequest.getName();
            String type = modifyRequest.getType();
            String description = modifyRequest.getDescription();
            String location = modifyRequest.getLocation();
            String image = modifyRequest.getImage();
            if(modifyRequest.getEmailUser() != null){
                User assignedUser = DatabaseHandler.getInstance().getUserDao().findByEmail(modifyRequest.getEmailUser()).join();
                itemToModify.setAssignedUser(assignedUser);
            }


            if(!name.isEmpty()){
                itemToModify.setName(name);
            }
            if(!type.isEmpty()){
                itemToModify.setType(type);
            }
            if(!description.isEmpty()){
                itemToModify.setDescription(description);
            }
            if(!location.isEmpty()){
                itemToModify.setLocation(location);
            }
            if(!image.isEmpty()){
                itemToModify.setImage(image);
            }


            CompletableFuture<Boolean> insertResult = DatabaseHandler.getInstance().getItemDao().updateItem(itemToModify);

            if (insertResult.get()) {
                // Item inserted successfully
                return ResponseEntity.status(HttpStatus.OK).body("Item modified successfully.");
            } else {
                // Failed to insert item
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to modify item.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the request: " + e.getMessage());
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }

    public ResponseEntity<?> deleteItem(GetItemRequest getItemRequest) {
        try{
            DatabaseHandler.getInstance().openConnection();
            CompletableFuture<Boolean> deleteResult = DatabaseHandler.getInstance().getItemDao().deleteItem(Long.valueOf(getItemRequest.getIdItem()));
            if (deleteResult.get()) {
                // Item inserted successfully
                return ResponseEntity.status(HttpStatus.OK).body("Item deleted successfully.");
            } else {
                // Failed to insert item
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to delete item.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the request: " + e.getMessage());
        }
        finally {
            DatabaseHandler.getInstance().closeConnection();
        }
    }
}
