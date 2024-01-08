package com.progettopsw.Controller;

import com.progettopsw.Entity.PersonOrder;
import com.progettopsw.Entity.ProductPersonOrder;
import com.progettopsw.Exception.CartException.CartNotFoundException;
import com.progettopsw.Exception.PersonException.PersonNotFoundException;
import com.progettopsw.Exception.PersonOrderException.PersonOrderNotFoundException;
import com.progettopsw.Exception.ProductException.ProductNotAvailableException;
import com.progettopsw.Other.ResponseMessage;
import com.progettopsw.Service.PersonOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class PersonOrderController {

    @Autowired
    PersonOrderService personOrderService;

    @PreAuthorize("hasRole('user')")
    @PostMapping("/addPersonOrder")
    public ResponseEntity addPersonOrder() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            personOrderService.addPersonOrder();
            return new ResponseEntity<>(new ResponseMessage("Added successful"), HttpStatus.OK);
        } catch (CartNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Cart not found"), HttpStatus.BAD_REQUEST);
        } catch (ProductNotAvailableException e) {
            return new ResponseEntity<>(new ResponseMessage("Product not available"), HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @GetMapping("/showPersonOrders")
    public ResponseEntity showPersonOrders() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<PersonOrder> result = null;
        try {
            result = personOrderService.showPersonOrders();
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/showPersonOrdersByPerson")
    public ResponseEntity showPersonOrdersByPerson(@RequestParam long id) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<PersonOrder> result = null;
        try {
            result = personOrderService.showPersonOrdersByPerson(id);
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/showProductPersonOrders")
    public ResponseEntity showProductPersonOrders(@RequestParam long personId, @RequestParam long personOrderId) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<ProductPersonOrder> result = null;
        try {
            result = personOrderService.showProductPersonOrders(personId, personOrderId);
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PersonOrderNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person Order not found"), HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @GetMapping("/showProductPersonOrdersByPerson")
    public ResponseEntity showProductPersonOrdersByPerson(@RequestParam long id) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<ProductPersonOrder> result = null;
        try {
            result = personOrderService.showProductPersonOrdersByPerson(id);
            if (result.isEmpty()) {
                return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PersonOrderNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person order not found"), HttpStatus.BAD_REQUEST);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

}
