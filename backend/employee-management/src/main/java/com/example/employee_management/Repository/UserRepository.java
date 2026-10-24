package com.example.employee_management.Repository;

import com.example.employee_management.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface UserRepository  extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}
