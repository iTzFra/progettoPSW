package com.progettopsw.Controller;

import com.progettopsw.DTO.CartProductDTO.AddCartProducDTO;
import com.progettopsw.DTO.CartProductDTO.UpdateCartProduct;
import com.progettopsw.Entity.Cart;
import com.progettopsw.Entity.CartProduct;
import com.progettopsw.Exception.CartProductException.CartProductNotFoundException;
import com.progettopsw.Exception.PersonException.PersonNotFoundException;
import com.progettopsw.Exception.ProductException.ProductNotFoundException;
import com.progettopsw.Other.ResponseMessage;
import com.progettopsw.Service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class CartController {

    @Autowired
    CartService cartService;

    @GetMapping("/showCartProducts")
    @PreAuthorize("hasRole('user')")
    public ResponseEntity showCartProducts() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<CartProduct> result = null;
        try {
            result = cartService.showCartProducts();
            if (result.size() == 0) {
                return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @PostMapping("/addCartProduct")
    public ResponseEntity addCartProduct(@Valid @RequestBody AddCartProducDTO addCartProducDTO) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            cartService.addCartProduct(addCartProducDTO);
            return new ResponseEntity(new ResponseMessage("Added successful"), HttpStatus.OK);
        } catch (ProductNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Product not found"), HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @PutMapping("/updateCartProduct")
    public ResponseEntity updateCartProduct(@Valid @RequestBody UpdateCartProduct updateCartProduct) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            cartService.updateCartProduct(updateCartProduct);
            return new ResponseEntity(new ResponseMessage("Update successful"), HttpStatus.OK);
        } catch (CartProductNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Cart Product not found"), HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @DeleteMapping("/deleteCartProduct")
    public ResponseEntity deleteCartProduct(@RequestParam long id) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            cartService.deleteCartProduct(id);
            return new ResponseEntity(new ResponseMessage("Delete successful"), HttpStatus.OK);
        } catch (CartProductNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Cart Product not found"), HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @GetMapping("/getCart")
    public ResponseEntity getCart() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        Cart cart = null;
        try {
            cart = cartService.getCart();
            if (cart == null) {
                return new ResponseEntity(new ResponseMessage("Cart empty"), HttpStatus.OK);
            } else {
                return new ResponseEntity(cart, HttpStatus.OK);
            }
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

}
