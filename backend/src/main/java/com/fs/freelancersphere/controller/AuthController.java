package com.fs.freelancersphere.controller;

import com.fs.freelancersphere.model.User;
import com.fs.freelancersphere.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        String result = authService.register(user);
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
}
