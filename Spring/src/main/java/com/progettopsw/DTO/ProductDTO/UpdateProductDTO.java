package com.progettopsw.DTO.ProductDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class UpdateProductDTO {

    @Positive(message = "Id must be positive")
    private long id;

    @NotBlank(message = "ProductName cannot be blank")
    private String productName;

    @Positive(message = "Price must be positive")
    private int price;

    @PositiveOrZero(message = "Quantity must be zero or positive")
    private int quantity;

    @NotBlank(message = "Description cannot be blank")
    @NotNull(message = "Description cannot be null")
    private String description;

}
