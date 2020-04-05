package edu.jschirm.simplerest.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("Couldn't find the user with the id: " + id);
    }
}
