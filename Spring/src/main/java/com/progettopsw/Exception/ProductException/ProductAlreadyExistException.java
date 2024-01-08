package com.progettopsw.Exception.ProductException;

public class ProductAlreadyExistException extends RuntimeException {

    public ProductAlreadyExistException(String message) {
        super(message);
    }

}
