
package com.example.employee_management.Repository;

import com.example.employee_management.Entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository
        extends JpaRepository<Employee, Integer> {

    @Query("""
        SELECT e FROM Employee e
        WHERE
            (:search IS NULL
                OR LOWER(e.name) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(e.email) LIKE LOWER(CONCAT('%', :search, '%')))
        AND (:department IS NULL
                OR LOWER(e.department) = LOWER(:department))
        AND (:status IS NULL
                OR LOWER(e.status) = LOWER(:status))
        """)
    Page<Employee> searchEmployees(
            @Param("search") String search,
            @Param("department") String department,
            @Param("status") String status,
            Pageable pageable
    );
}
