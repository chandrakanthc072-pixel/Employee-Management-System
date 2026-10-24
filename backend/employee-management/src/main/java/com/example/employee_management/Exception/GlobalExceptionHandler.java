package com.example.employee_management.Exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> fieldErrors = new LinkedHashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                fieldErrors.putIfAbsent(
                        error.getField(),
                        Objects.requireNonNullElse(
                                error.getDefaultMessage(),
                                "Invalid value"
                        )
                )
        );

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", 400);
        body.put("error", "Validation failed");
        body.put("fieldErrors", fieldErrors);

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrity(
            DataIntegrityViolationException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", 409);
        body.put("error", "Database constraint violation");
        body.put(
                "message",
                "The email may already exist, or the data violates a database constraint."
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleUnreadableBody(
            HttpMessageNotReadableException ex) {

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", 400);
        body.put("error", "Invalid request body");
        body.put("message", "Check the JSON format and data types.");

        return ResponseEntity.badRequest().body(body);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleUnexpected(
            Exception ex) {

        // Log the actual exception on the server for debugging.
        ex.printStackTrace();

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", 500);
        body.put("error", "Internal server error");
        body.put(
                "message",
                "An unexpected error occurred. Please try again."
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(body);
    }
}
