package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import it.unical.demacs.backend.Persistence.Model.Product;
import it.unical.demacs.backend.Service.Request.GetProductRequest;
import it.unical.demacs.backend.Service.Request.InsertProductRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class ProductService {

    public ResponseEntity<?> insertProduct(@RequestBody InsertProductRequest insertProductRequest) {
        String name = insertProductRequest.getName();
        String type = insertProductRequest.getType();
        String description = insertProductRequest.getDescription();
        String location = insertProductRequest.getLocation();
        String category = insertProductRequest.getCategory();
        String image = insertProductRequest.getImage();

        try {
            // Check if the Product already exists by name
            CompletableFuture<Product> existingProductFuture = DatabaseHandler.getInstance().getProductDao().findByName(name);
            Product existingProduct = existingProductFuture.get();

            if (existingProduct.getIdProduct() != null) {
                // Product with the same name already exists, return an error response
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Product with name '" + name + "' already exists.");
            }

            // Product doesn't exist, proceed with insertion
            Product newProduct = new Product();
            newProduct.setName(name);
            newProduct.setType(type);
            newProduct.setDescription(description);
            newProduct.setLocation(location);
            newProduct.setCategory(category);
            newProduct.setImage(image);

            CompletableFuture<Boolean> insertResult = DatabaseHandler.getInstance().getProductDao().insertProduct(newProduct);

            if (insertResult.get()) {
                // Product inserted successfully
                return ResponseEntity.status(HttpStatus.OK).body("Product inserted successfully.");
            } else {
                // Failed to insert Product
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to insert Product.");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing the request: " + e.getMessage());
        }
    }

    public ResponseEntity<?> allProducts() {
        return ResponseEntity.ok().body(DatabaseHandler.getInstance().getProductDao().findAll());
    }

    public ResponseEntity<?> getProduct(@RequestBody GetProductRequest getProductRequest) throws ExecutionException, InterruptedException {
        CompletableFuture<Product> existingProductFuture = DatabaseHandler.getInstance().getProductDao().findByPrimaryKey(getProductRequest.getIdProduct());
        Product existingProduct = existingProductFuture.get();

        if (existingProduct.getIdProduct() == null) {
            // Product with the same name already exists, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Product doesn't exists.");
        } else {
            return ResponseEntity.ok().body(DatabaseHandler.getInstance().getProductDao().findByPrimaryKey(getProductRequest.getIdProduct()));
        }
    }
}
