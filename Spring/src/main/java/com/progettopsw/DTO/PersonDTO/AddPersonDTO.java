package com.progettopsw.DTO.PersonDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class AddPersonDTO {

    @NotNull(message = "FirstName cannot be null")
    @NotBlank(message = "FirstName cannot be blank")
    private String firstName;

    @NotNull(message = "LastName cannot be null")
    @NotBlank(message = "LastName cannot be blank")
    private String lastName;

    @Positive(message = "Telephone must be positive")
    private long telephone;

    @NotNull(message = "Email cannot be null")
    @NotBlank(message = "Email cannot be blank")
    private String email;

    @NotNull(message = "Password cannot be null")
    @NotBlank(message = "Password cannot be blank")
    private String password;

}
