package com.progettoWeb.Backend.Controller;

import com.progettoWeb.Backend.Persistence.Request.InsertItemRequest;
import com.progettoWeb.Backend.Service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
    //Arrivano le richieste HTTP
    private final ItemService itemService;

    @PostMapping("/api/insertItem")
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest){
        return itemService.insertItem(insertItemRequest);
    }

    @PostMapping("/api/allItems")
    public ResponseEntity<?> allItems(){
        return itemService.allItems();
    }

}