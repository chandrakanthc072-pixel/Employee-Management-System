package com.example.employee_management.Service;

import com.example.employee_management.Entity.User;
import com.example.employee_management.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException();
        }

        user.setRole("USER");
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public User registerAdmin(
            User newAdmin,
            String approverUsername,
            String approverPassword) {
        User approver = userRepository.findByUsername(approverUsername)
                .orElse(null);

        if (approver == null
                || !"ADMIN".equals(approver.getRole())
                || approverPassword == null
                || !passwordEncoder.matches(
                        approverPassword,
                        approver.getPassword())) {
            throw new AdminApprovalException();
        }

        if (userRepository.findByUsername(newAdmin.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException();
        }

        newAdmin.setId(null);
        newAdmin.setRole("ADMIN");
        newAdmin.setPassword(passwordEncoder.encode(newAdmin.getPassword()));

        return userRepository.save(newAdmin);
    }

    public User login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElse(null);

        if (user != null &&
                passwordEncoder.matches(password, user.getPassword())) {

            return user;
        }

        return null;
    }
}