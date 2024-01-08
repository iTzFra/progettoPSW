package com.progettopsw.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class PersonOrder {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;

    private int total;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate orderDate;

    private int quantity;

    @Version
    @JsonIgnore
    private int version;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private Person person;

    @OneToMany(mappedBy = "personOrder")
    @JsonIgnore
    private List<ProductPersonOrder> productPersonOrders;

}
