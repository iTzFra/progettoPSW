package com.progettopsw.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProductPersonOrder {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;

    private int price;

    private int quantity;

    @Version
    @JsonIgnore
    private int version;

    @ManyToOne
    @JoinColumn
    private Product product;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private PersonOrder personOrder;

}
