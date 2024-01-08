package com.progettopsw.Exception.PersonException;

public class PersonAlreadyExistException extends RuntimeException {

    public PersonAlreadyExistException(String message) {
        super(message);
    }

}
