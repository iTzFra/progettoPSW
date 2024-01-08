package com.progettopsw.DTO.CartProductDTO;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddCartProducDTO {

    @Positive(message = "Id must be positive")
    private long productId;

    @Positive(message = "Quantity must be positive")
    private int quantity;

}
