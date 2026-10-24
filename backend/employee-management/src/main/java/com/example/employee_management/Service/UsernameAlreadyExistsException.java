package com.example.employee_management.Service;

public class UsernameAlreadyExistsException extends RuntimeException {

    public UsernameAlreadyExistsException() {
        super("Username already exists");
    }
}
