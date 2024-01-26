package com.progettoWeb.Backend.Service;

import com.progettoWeb.Backend.Persistence.DatabaseHandler;
import com.progettoWeb.Backend.Persistence.Model.Item;
import com.progettoWeb.Backend.Persistence.Request.InsertItemRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
@Service
public class ItemService {
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        String name = insertItemRequest.getName();
        String description = insertItemRequest.getDescription();
        String type = insertItemRequest.getType();
        String quantity = insertItemRequest.getQuantity();

        // Verifica se l'item esiste nel database
        Item item = DatabaseHandler.getInstance().getItemDao().findByPrimaryKey(name);

        if (item != null) {
            // Se l'item è già nel db, restituisci un messaggio di errore
            return ResponseEntity.status(401).body("{\"message\": \"This item is already in the db\"}");
        } else {
            // Se l'item non è nel db, inseriscilo
            item = new Item(name, description, type, quantity);
            DatabaseHandler.getInstance().getItemDao().insertItem(item);
        }
        // Restituisci un messaggio di successo
        return ResponseEntity.ok().body("{\"message\": \"Item inserted\"}");
    }
}
