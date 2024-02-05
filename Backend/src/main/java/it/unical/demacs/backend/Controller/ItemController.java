package it.unical.demacs.backend.Controller;

import it.unical.demacs.backend.Service.Request.GetItemRequest;
import it.unical.demacs.backend.Service.Request.InsertItemRequest;
import it.unical.demacs.backend.Service.ItemService;
import it.unical.demacs.backend.Service.Request.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {

    private final ItemService itemService;

    // POST
    @PostMapping("/api/insertItem")
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {
        return itemService.insertItem(insertItemRequest);
    }

    @PostMapping("/api/getItem")
    public ResponseEntity<?> getItem(@RequestBody GetItemRequest getItemRequest){
        return itemService.getItemProxy(getItemRequest);
    }

    // GET
    @GetMapping("/api/allItems")
    public ResponseEntity<?> allItems(){
        return itemService.allItems();
    }

    @GetMapping("/api/searchItem")
    public ResponseEntity<?> searchItem(@RequestBody SearchItemRequest searchItemRequest){
        return itemService.searchItem(searchItemRequest);
    }

}