package com.example.employee_management.Service;

public class AdminApprovalException extends RuntimeException {

    public AdminApprovalException() {
        super("Valid administrator credentials are required");
    }
}
