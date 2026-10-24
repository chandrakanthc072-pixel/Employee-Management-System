package com.example.employee_management.Service;

import com.example.employee_management.Entity.User;
import com.example.employee_management.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void rejectsAdminRegistrationWithoutAnAdminApprover() {
        when(userRepository.findByUsername("approver"))
                .thenReturn(Optional.empty());

        assertThrows(
                AdminApprovalException.class,
                () -> authService.registerAdmin(
                        new User(null, "new-admin", "password", null),
                        "approver",
                        "password"
                )
        );

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void createsAdminOnlyAfterValidAdminApproval() {
        User approver = new User(1, "approver", "hashed-approver-password", "ADMIN");
        User newAdmin = new User(null, "new-admin", "new-password", null);

        when(userRepository.findByUsername("approver"))
                .thenReturn(Optional.of(approver));
        when(passwordEncoder.matches("approver-password", "hashed-approver-password"))
                .thenReturn(true);
        when(userRepository.findByUsername("new-admin"))
                .thenReturn(Optional.empty());
        when(passwordEncoder.encode("new-password"))
                .thenReturn("hashed-new-password");
        when(userRepository.save(newAdmin)).thenReturn(newAdmin);

        User createdAdmin = authService.registerAdmin(
                newAdmin,
                "approver",
                "approver-password"
        );

        assertEquals("ADMIN", createdAdmin.getRole());
        assertEquals("hashed-new-password", createdAdmin.getPassword());
        verify(userRepository).save(newAdmin);
    }

}
