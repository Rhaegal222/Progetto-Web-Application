package it.unical.demacs.backend.Controller.RestController;

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
    public ResponseEntity<?> insertItem(@RequestBody InsertItemRequest insertItemRequest) {return itemService.insertItem(insertItemRequest);}
    @PostMapping("/api/modifyItem")
    public ResponseEntity<?> modifyItem(@RequestBody ModifyRequest modifyRequest){return itemService.modifyRequest(modifyRequest);}
    @PostMapping("/api/deleteItem")
    public ResponseEntity<?> deleteItem(@RequestBody GetItemRequest getItemRequest){return itemService.deleteItem(getItemRequest);}

    // GET
    @GetMapping("/api/allItems")
    public ResponseEntity<?> allItems(){
        return itemService.allItems();
    }

    // GET con parametri di ricerca
    @GetMapping("/api/items")
    public ResponseEntity<?> searchItems(@RequestParam(required = false) String search, @RequestParam(required = false) String category) {
        if (search == null && (category == null || category.equals("all"))) {
            return itemService.allItems();
        } else if (search == null) {
            return itemService.searchItems("", category);
        } else if (category == null || category.equals("all")) {
            return itemService.searchItems(search, "");
        } else {
            return itemService.searchItems(search, category);
        }
    }
    @GetMapping("/api/getItem")
    public ResponseEntity<?> getItem(@RequestParam("idItem") long idItem) {
        return itemService.getItemProxy(idItem);
    }

}