package com.progettopsw.Service;

import com.progettopsw.Entity.*;
import com.progettopsw.Exception.CartException.CartNotFoundException;
import com.progettopsw.Exception.PersonException.PersonNotFoundException;
import com.progettopsw.Exception.PersonOrderException.PersonOrderNotFoundException;
import com.progettopsw.Exception.ProductException.ProductNotAvailableException;
import com.progettopsw.Other.Util;
import com.progettopsw.Repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PersonOrderService {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    PersonOrderRepository personOrderRepository;

    @Autowired
    ProductPersonOrderRepository productPersonOrderRepository;

    @Autowired
    CartProductRepository cartProductRepository;

    @Autowired
    CartRepository cartRepository;

    public void addPersonOrder() throws CartNotFoundException, ProductNotAvailableException, PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        Cart cart = person.getCart();
        if (cart == null) {
            throw new CartNotFoundException("Cart not found");
        }
        PersonOrder personOrder = new PersonOrder();
        personOrder.setPerson(person);
        personOrder.setTotal(cart.getTotal());
        personOrder.setQuantity(cart.getQuantity());
        personOrder.setOrderDate(LocalDate.now());
        personOrderRepository.save(personOrder);
        if (person.getPersonOrders() == null) {
            person.setPersonOrders(new ArrayList<>());
        }
        person.getPersonOrders().add(personOrder);
        for (CartProduct cartProduct : cart.getCartProducts()) {
            ProductPersonOrder productPersonOrder = new ProductPersonOrder();
            productPersonOrder.setPersonOrder(personOrder);
            productPersonOrder.setPrice(cartProduct.getProduct().getPrice());
            productPersonOrder.setProduct(cartProduct.getProduct());
            productPersonOrder.setQuantity(cartProduct.getQuantity());
            productPersonOrderRepository.save(productPersonOrder);
            if (cartProduct.getProduct().getQuantity() < cartProduct.getQuantity()) {
                throw new ProductNotAvailableException("Product not available");
            }
            cartProduct.getProduct().setQuantity(cartProduct.getProduct().getQuantity() - cartProduct.getQuantity());
            if (personOrder.getProductPersonOrders() == null) {
                personOrder.setProductPersonOrders(new ArrayList<>());
            }
            personOrder.getProductPersonOrders().add(productPersonOrder);
            cartProduct.getProduct().getCartProducts().remove(cartProduct);
        }
        person.setCart(null);
        cartProductRepository.deleteAll(cart.getCartProducts());
        cartRepository.delete(cart);
    }

    public List<PersonOrder> showPersonOrders() throws PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        List<PersonOrder> personOrders = person.getPersonOrders();
        if (!personOrders.isEmpty()) {
            return personOrders;
        } else {
            return new ArrayList<>();
        }
    }

    public List<PersonOrder> showPersonOrdersByPerson(long id) throws PersonNotFoundException {
        Person person = personRepository.findById(id);
        if (!personRepository.existsById(id)) {
            throw new PersonNotFoundException("Person not found");
        }
        List<PersonOrder> personOrders = person.getPersonOrders();
        if (!personOrders.isEmpty()) {
            return personOrders;
        } else {
            return new ArrayList<>();
        }
    }

    public List<ProductPersonOrder> showProductPersonOrders(long personId, long personOrderId) throws PersonOrderNotFoundException, PersonNotFoundException {
        if (!personRepository.existsById(personId)) {
            throw new PersonNotFoundException("Person not found");
        }
        if (!personOrderRepository.existsById(personOrderId)) {
            throw new PersonOrderNotFoundException("Person Order not found");
        }
        PersonOrder personOrder = personOrderRepository.findById(personOrderId);
        Person person = personRepository.findById(personId);
        if (person.getPersonOrders().contains(personOrder)) {
            if (!personOrder.getProductPersonOrders().isEmpty()) {
                return personOrder.getProductPersonOrders();
            } else {
                return new ArrayList<>();
            }
        }
        throw new PersonOrderNotFoundException("Person Order not found");
    }

    public List<ProductPersonOrder> showProductPersonOrdersByPerson(long id) throws PersonOrderNotFoundException, PersonNotFoundException {
        if (!personOrderRepository.existsById(id)) {
            throw new PersonOrderNotFoundException("Person Order not found");
        }
        PersonOrder personOrder = personOrderRepository.findById(id);
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        if (person.getPersonOrders().contains(personOrder)) {
            if (!personOrder.getProductPersonOrders().isEmpty()) {
                return personOrder.getProductPersonOrders();
            } else {
                return new ArrayList<>();
            }
        }
        throw new PersonOrderNotFoundException("Person Order not found");
    }

}
