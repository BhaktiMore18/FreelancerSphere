package com.fs.freelancersphere.controller;

import com.fs.freelancersphere.model.auth.User;
import com.fs.freelancersphere.model.auth.UserRegisterRequest;
import com.fs.freelancersphere.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRegisterRequest request) {
        String result = authService.register(request);
        if (result.contains("already")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }

    // Optional test route
    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }

     @PostMapping("/login")
    public Map<String, String> loginUser(@RequestBody Map<String, String> userData) {
        String token = authService.login(userData.get("email"), userData.get("password"));
        return Map.of("token", token);
    }

    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {
        return "Welcome to Admin Dashboard!";
    }

    @GetMapping("/freelancer/dashboard")
    @PreAuthorize("hasRole('FREELANCER')")
    public String freelancerDashboard() {
        return "Welcome to Freelancer Dashboard!";
    }

}
