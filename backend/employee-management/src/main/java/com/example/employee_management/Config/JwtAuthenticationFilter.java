package com.example.employee_management.Config;

import com.example.employee_management.Service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;

    public JwtAuthenticationFilter(JWTService jwtService) {
        this.jwtService = jwtService;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Check whether the Authorization header contains a Bearer token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {
            // Extract username and role from the JWT
            String username = jwtService.extractUsername(token);
            String role = jwtService.extractRole(token);

            // Set authentication with the user's role
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            List.of(
                                    new SimpleGrantedAuthority("ROLE_" + role)
                            )
                    );

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

        } catch (Exception e) {
            SecurityContextHolder.clearContext();

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("text/plain");
            response.getWriter().write("Invalid or expired token");
            return;
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }

}