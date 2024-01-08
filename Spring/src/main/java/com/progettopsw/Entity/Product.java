package com.progettopsw.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Product {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;

    private String productName;

    private int price;

    @Column(unique = true)
    private long code;

    private int quantity;

    private String description;

    @Version
    @JsonIgnore
    private int version;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    List<CartProduct> cartProducts;

}
