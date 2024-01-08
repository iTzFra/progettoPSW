package com.progettopsw.Controller;

import com.progettopsw.DTO.PersonDTO.AddPersonDTO;
import com.progettopsw.DTO.PersonDTO.UpdatePersonDTO;
import com.progettopsw.Entity.Person;
import com.progettopsw.Exception.PersonException.PersonAlreadyExistException;
import com.progettopsw.Exception.PersonException.PersonNotFoundException;
import com.progettopsw.Other.ResponseMessage;
import com.progettopsw.Service.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @PostMapping("/addPerson")
    public ResponseEntity addPerson(@Valid @RequestBody AddPersonDTO addPersonDTO) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            personService.addPerson(addPersonDTO);
            return new ResponseEntity<>(new ResponseMessage("Added successful"), HttpStatus.OK);
        } catch (PersonAlreadyExistException personAlreadyExistException) {
            return new ResponseEntity<>(new ResponseMessage("Person already exist"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @PutMapping("/updatePerson")
    public ResponseEntity updatePerson(@Valid @RequestBody UpdatePersonDTO updatePersonDTO) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        try {
            personService.updatePerson(updatePersonDTO);
            return new ResponseEntity<>(new ResponseMessage("Update successful"), HttpStatus.OK);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('user')")
    @GetMapping("/getLoggedPerson")
    public ResponseEntity getLoggedPerson() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        Person person = null;
        try {
            person = personService.getLoggedPerson();
            return new ResponseEntity<>(person, HttpStatus.OK);
        } catch (PersonNotFoundException e) {
            return new ResponseEntity<>(new ResponseMessage("Person not found"), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/showPersons")
    public ResponseEntity showPersons(@RequestParam int pageNumber, @RequestParam int pageSize, @RequestParam String sortBy) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<Person> result = personService.showPersons(pageNumber, pageSize, sortBy);
        if (result.size() == 0) {
            return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('admin')")
    @GetMapping("/showPersonsByEmail")
    public ResponseEntity showPersonsByEmail(@RequestParam int pageNumber, @RequestParam int pageSize, @RequestParam String sortBy, @RequestParam String email) throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        List<Person> result = personService.showPersonsByEmail(pageNumber, pageSize, sortBy, email);
        if (result.size() == 0) {
            return new ResponseEntity<>(new ResponseMessage("No results"), HttpStatus.OK);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
