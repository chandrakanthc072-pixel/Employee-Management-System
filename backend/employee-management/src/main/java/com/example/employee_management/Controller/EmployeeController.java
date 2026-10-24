package com.example.employee_management.Controller;

import com.example.employee_management.Entity.Employee;
import com.example.employee_management.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @Valid @RequestBody Employee employee) {

        Employee savedEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    // Get all employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        List<Employee> employees = employeeService.getAllEmployees();

        return ResponseEntity.ok(employees);
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable Integer id) {

        Employee employee = employeeService.getEmployeeById(id);

        if (employee == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(employee);
    }

    // Update employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Integer id,
            @Valid @RequestBody Employee employee) {

        Employee updatedEmployee =
                employeeService.updateEmployee(id, employee);

        if (updatedEmployee == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedEmployee);
    }

    // Delete employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(
            @PathVariable Integer id) {

        boolean deleted = employeeService.deleteEmployee(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok("Employee deleted successfully");
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Employee>> searchEmployees(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                employeeService.searchEmployees(
                        search, department, status, page, size
                )
        );
    }
}