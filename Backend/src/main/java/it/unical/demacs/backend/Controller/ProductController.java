package it.unical.demacs.backend.Controller;


import it.unical.demacs.backend.Service.Request.InsertProductRequest;
import it.unical.demacs.backend.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    //Arrivano le richieste HTTP
    private final ProductService productService;

    @PostMapping("/api/insertProduct")
    public ResponseEntity<?> insertProduct(@RequestBody InsertProductRequest insertProductRequest) {
        return productService.insertProduct(insertProductRequest);
    }

    @PostMapping("/api/products")
    public ResponseEntity<?> allProducts(){
        return productService.allProducts();
    }

    /*
    @PostMapping("/api/product")
    public ResponseEntity<?> getProduct(@RequestBody GetProductRequest getProductRequest) throws ExecutionException, InterruptedException {
        return productService.getProduct(getProductRequest);
    }
    */

}