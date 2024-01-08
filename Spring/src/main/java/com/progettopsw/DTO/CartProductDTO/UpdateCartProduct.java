package com.progettopsw.DTO.CartProductDTO;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UpdateCartProduct {

    @Positive(message = "Id must be positive")
    private long id;

    @Positive(message = "Quantity must be positive")
    private int quantity;

}
