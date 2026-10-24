
package com.example.employee_management.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/auth/admin/register"
                        ).permitAll()

                        .requestMatchers("/api/auth/**").permitAll()

                        // Both roles may view employee information.
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/employees",
                                "/api/employees/**"
                        ).hasAnyRole("ADMIN", "USER")

                        // Only admins may create employees.
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/employees",
                                "/api/employees/"
                        ).hasRole("ADMIN")

                        // Only admins may update or delete employees.
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/employees/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/employees/**"
                        ).hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
