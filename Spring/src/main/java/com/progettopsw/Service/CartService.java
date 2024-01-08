package com.progettopsw.Service;

import com.progettopsw.DTO.CartProductDTO.AddCartProducDTO;
import com.progettopsw.DTO.CartProductDTO.UpdateCartProduct;
import com.progettopsw.Entity.Cart;
import com.progettopsw.Entity.CartProduct;
import com.progettopsw.Entity.Person;
import com.progettopsw.Entity.Product;
import com.progettopsw.Exception.CartProductException.CartProductNotFoundException;
import com.progettopsw.Exception.PersonException.PersonNotFoundException;
import com.progettopsw.Exception.ProductException.ProductNotFoundException;
import com.progettopsw.Other.Util;
import com.progettopsw.Repository.CartProductRepository;
import com.progettopsw.Repository.CartRepository;
import com.progettopsw.Repository.PersonRepository;
import com.progettopsw.Repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CartService {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CartProductRepository cartProductRepository;

    public List<CartProduct> showCartProducts() throws PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        Cart cart = person.getCart();
        if (cart == null) {
            return new ArrayList<>();
        }
        return cart.getCartProducts();
    }

    public void addCartProduct(AddCartProducDTO addCartProducDTO) throws ProductNotFoundException, PersonNotFoundException {
        if (!productRepository.existsById(addCartProducDTO.getProductId())) {
            throw new ProductNotFoundException("Product not found");
        }
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Product product = productRepository.findById(addCartProducDTO.getProductId());
        Person person = personRepository.findByEmail(email);
        Cart cart = person.getCart();
        if (cart == null) {
            Cart newCart = new Cart();
            cartRepository.save(newCart);
            person.setCart(newCart);
            cart = newCart;
        }
        if (cart.getCartProducts() == null) {
            cart.setCartProducts(new ArrayList<>());
        }
        if (product.getCartProducts() == null) {
            product.setCartProducts(new ArrayList<>());
        }
        boolean flag = true;
        for (CartProduct cartProduct : cart.getCartProducts()) {
            if (cartProduct.getProduct().equals(product)) {
                cartProduct.setQuantity(cartProduct.getQuantity() + addCartProducDTO.getQuantity());
                cart.setTotal((product.getPrice() * addCartProducDTO.getQuantity()) + cart.getTotal());
                cart.setQuantity(cart.getQuantity() + addCartProducDTO.getQuantity());
                flag = false;
            }
        }
        if (flag) {
            CartProduct cartProduct = new CartProduct();
            cartProduct.setProduct(product);
            cartProduct.setQuantity(addCartProducDTO.getQuantity());
            cartProduct.setCart(cart);
            cartProductRepository.save(cartProduct);
            cart.getCartProducts().add(cartProduct);
            cart.setTotal((product.getPrice() * addCartProducDTO.getQuantity()) + cart.getTotal());
            cart.setQuantity(cart.getQuantity() + addCartProducDTO.getQuantity());
            product.getCartProducts().add(cartProduct);
        }
    }

    public void updateCartProduct(UpdateCartProduct updateCartProduct) throws CartProductNotFoundException, PersonNotFoundException {
        if (!cartProductRepository.existsById(updateCartProduct.getId())) {
            throw new CartProductNotFoundException("Cart product not found ");
        }
        CartProduct cartProduct = cartProductRepository.findById(updateCartProduct.getId());
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        Product product = cartProduct.getProduct();
        Cart cart = person.getCart();
        if (cart.getCartProducts().contains(cartProduct)) {
            cart.setQuantity(cart.getQuantity() - cartProduct.getQuantity() + updateCartProduct.getQuantity());
            cart.setTotal(cart.getTotal() - (product.getPrice() * cartProduct.getQuantity()) + (product.getPrice() * updateCartProduct.getQuantity()));
            cartProduct.setQuantity(updateCartProduct.getQuantity());
            return;
        }
        throw new CartProductNotFoundException("Cart product not found");
    }

    public void deleteCartProduct(long id) throws CartProductNotFoundException, PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        if (!cartProductRepository.existsById(id)) {
            throw new CartProductNotFoundException("Cart product not found");
        }
        CartProduct cartProduct = cartProductRepository.findById(id);
        Cart cart = person.getCart();
        Product product = cartProduct.getProduct();
        cart.setQuantity(cart.getQuantity() - cartProduct.getQuantity());
        cart.setTotal(cart.getTotal() - (product.getPrice() * cartProduct.getQuantity()));
        product.getCartProducts().remove(cartProduct);
        cart.getCartProducts().remove(cartProduct);
        cartProductRepository.delete(cartProduct);
        if (cart.getCartProducts().isEmpty()) {
            person.setCart(null);
            cartRepository.delete(cart);
        }
    }

    public Cart getCart() throws PersonNotFoundException {
        String email = Util.getEmail();
        if (!personRepository.existsByEmail(email)) {
            throw new PersonNotFoundException("Person not found");
        }
        Person person = personRepository.findByEmail(email);
        Cart cart = person.getCart();
        return cart;
    }

}
