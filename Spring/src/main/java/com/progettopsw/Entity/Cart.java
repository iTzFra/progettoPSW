package com.progettopsw.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Cart {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;

    private int quantity;

    private int total;

    @Version
    @JsonIgnore
    private int version;

    @JsonIgnore
    @OneToMany(mappedBy = "cart")
    private List<CartProduct> cartProducts;

}
