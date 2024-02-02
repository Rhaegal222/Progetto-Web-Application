package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Service.Request.GetItemRequest;
import it.unical.demacs.backend.Service.Request.InsertItemRequest;
import it.unical.demacs.backend.Service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.concurrent.ExecutionException;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
    //Arrivano le richieste HTTP
    private final ItemService itemService;

    @PostMapping("/api/insertProduct")
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        return itemService.insertItem(insertItemRequest);
    }

    @PostMapping("/api/products")
    public ResponseEntity<?> allItems(){
        return itemService.allItems();
    }

    /*
    @PostMapping("/api/product")
    public ResponseEntity<?> getItem(@RequestBody GetItemRequest getItemRequest) throws ExecutionException, InterruptedException {
        return itemService.getItem(getItemRequest);
    }
    */

}