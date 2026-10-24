package com.example.employee_management.Service;

import com.example.employee_management.Entity.Employee;
import com.example.employee_management.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Create
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get all
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get by ID
    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // Update
    public Employee updateEmployee(Integer id, Employee employee) {

        Employee existing = employeeRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setName(employee.getName());
            existing.setEmail(employee.getEmail());
            existing.setPhone(employee.getPhone());
            existing.setDepartment(employee.getDepartment());
            existing.setDesignation(employee.getDesignation());
            existing.setSalary(employee.getSalary());
            existing.setJoiningDate(employee.getJoiningDate());
            existing.setStatus(employee.getStatus());

            return employeeRepository.save(existing);
        }

        return null;
    }

    // Delete
    public boolean deleteEmployee(Integer id) {

        Employee existing = employeeRepository.findById(id).orElse(null);

        if (existing != null) {
            employeeRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public Page<Employee> searchEmployees(
            String search,
            String department,
            String status,
            int page,
            int size) {

        int safePage = Math.max(page, 0);
        int safeSize = Math.max(1, Math.min(size, 100));

        Pageable pageable = PageRequest.of(
                safePage,
                safeSize,
                Sort.by(Sort.Direction.DESC, "id")
        );

        return employeeRepository.searchEmployees(
                clean(search),
                clean(department),
                clean(status),
                pageable
        );
    }

    private String clean(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }
}