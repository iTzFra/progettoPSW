package com.progettopsw.Controller;

import com.progettopsw.DTO.ProductDTO.AddProductDTO;
import com.progettopsw.DTO.ProductDTO.UpdateProductDTO;
import com.progettopsw.Entity.Product;
import com.progettopsw.Exception.ProductException.ProductAlreadyExistException;
import com.progettopsw.Exception.ProductException.ProductNotFoundException;
import com.progettopsw.Other.ResponseMessage;
import com.progettopsw.Service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @PreAuthorize("hasRole('admin')")
    @PostMapping("/addProduct")
    public ResponseEntity addProduct(@Valid @RequestBody AddProductDTO addProductDTO) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            productService.addProduct(addProductDTO);
            return new ResponseEntity<>(new ResponseMessage("Added successful"), HttpStatus.OK);
        } catch (ProductAlreadyExistException personAlreadyExistException) {
            return new ResponseEntity<>(new ResponseMessage("Product already exist"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('admin')")
    @PutMapping("/updateProduct")
    public ResponseEntity updateProduct(@Valid @RequestBody UpdateProductDTO updateProductDTO) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            productService.updateProduct(updateProductDTO);
            return new ResponseEntity<>(new ResponseMessage("Update successful"), HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Product not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/showProducts")
    public ResponseEntity showProducts(@RequestParam int pageNumber, @RequestParam int pageSize, @RequestParam String sortBy) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<Product> result = productService.showProducts(pageNumber, pageSize, sortBy);
        if (result.size() == 0) {
            return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/showProductsByProductName")
    public ResponseEntity showProductsByProductName(@RequestParam int pageNumber, @RequestParam int pageSize, @RequestParam String sortBy, @RequestParam String productName) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<Product> result = productService.showProductsByProductName(pageNumber, pageSize, sortBy, productName);
        if (result.size() == 0) {
            return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
