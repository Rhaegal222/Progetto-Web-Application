package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Service.Request.GetItemRequest;
import it.unical.demacs.backend.Service.Request.InsertItemRequest;
import it.unical.demacs.backend.Service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
    //Arrivano le richieste HTTP
    private final ItemService itemService;

    @PostMapping("/api/insertItem")
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        return itemService.insertItem(insertItemRequest);
    }

    @GetMapping("/api/allItems")
    public ResponseEntity<?> allItems(){
        return itemService.allItems();
    }

    @PostMapping("/api/getItem")
    public ResponseEntity<?> getItem(@RequestBody GetItemRequest getItemRequest){
        return itemService.getItemProxy(getItemRequest);
    }

}