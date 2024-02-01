package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Item;
import it.unical.demacs.backend.Service.Request.InsertItemRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
@Service
public class ItemService {
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        String name = insertItemRequest.getName();
        String description = insertItemRequest.getDescription();
        String type = insertItemRequest.getType();
        Integer quantity = Integer.valueOf(insertItemRequest.getQuantity());

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

    public ResponseEntity<?> allItems() {
        return ResponseEntity.ok().body(DatabaseHandler.getInstance().getItemDao().findAll());
    }
}
