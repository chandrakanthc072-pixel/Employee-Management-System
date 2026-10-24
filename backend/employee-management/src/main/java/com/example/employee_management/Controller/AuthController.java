package com.example.employee_management.Controller;

import com.example.employee_management.Entity.User;
import com.example.employee_management.Service.AdminApprovalException;
import com.example.employee_management.Service.AuthService;
import com.example.employee_management.Service.JWTService;
import com.example.employee_management.Service.UsernameAlreadyExistsException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            User savedUser = authService.register(user);

            return ResponseEntity.ok(
                    new RegistrationResponse(savedUser.getUsername())
            );
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity
                    .status(409)
                    .body("Username already exists");
        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> registerAdmin(
            @Valid @RequestBody AdminRegistrationRequest request) {
        User newAdmin = new User();
        newAdmin.setUsername(request.username());
        newAdmin.setPassword(request.password());

        try {
            User savedAdmin = authService.registerAdmin(
                    newAdmin,
                    request.approverUsername(),
                    request.approverPassword()
            );

            return ResponseEntity.ok(
                    new RegistrationResponse(savedAdmin.getUsername())
            );
        } catch (UsernameAlreadyExistsException e) {
            return ResponseEntity
                    .status(409)
                    .body("Username already exists");
        } catch (AdminApprovalException e) {
            return ResponseEntity
                    .status(403)
                    .body("Valid administrator credentials are required");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String username,
            @RequestParam String password) {

        User user = authService.login(username, password);

        if (user == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole()
        );

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        user.getUsername(),
                        user.getRole()
                )
        );
    }

    public static class LoginResponse {

        private String token;
        private String username;
        private String role;

        public LoginResponse(String token, String username, String role) {
            this.token = token;
            this.username = username;
            this.role = role;
        }

        public String getToken() {
            return token;
        }

        public String getUsername() {
            return username;
        }

        public String getRole() {
            return role;
        }
    }

    public static class RegistrationResponse {

        private final String username;

        public RegistrationResponse(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }
    }

    public record AdminRegistrationRequest(
            @NotBlank String username,
            @NotBlank String password,
            @NotBlank String approverUsername,
            @NotBlank String approverPassword) {
    }
}