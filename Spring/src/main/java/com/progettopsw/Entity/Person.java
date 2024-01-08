package com.progettopsw.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Person {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;

    private String firstName;

    private String lastName;

    private long telephone;

    @Column(unique = true)
    private String email;

    @Version
    @JsonIgnore
    private int version;

    @OneToOne
    @JsonIgnore
    @JoinColumn(unique = true)
    private Cart cart;

    @OneToMany(mappedBy = "person")
    @JsonIgnore
    private List<PersonOrder> personOrders;

}
