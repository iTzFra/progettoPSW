package com.progettopsw.DTO.PersonDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UpdatePersonDTO {

    @NotNull(message = "FirstName cannot be null")
    @NotBlank(message = "FirstName cannot be blank")
    private String firstName;

    @NotNull(message = "LastName cannot be null")
    @NotBlank(message = "LastName cannot be blank")
    private String lastName;

    @Positive(message = "Telephone must be positive")
    private long telephone;

}
