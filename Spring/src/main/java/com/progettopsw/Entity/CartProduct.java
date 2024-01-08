package com.progettopsw.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CartProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int quantity;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    @JoinColumn
    private Product product;

}
