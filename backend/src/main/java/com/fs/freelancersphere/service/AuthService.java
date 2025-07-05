package com.fs.freelancersphere.service;

import com.fs.freelancersphere.model.auth.Role;
import com.fs.freelancersphere.model.auth.User;
import com.fs.freelancersphere.repository.UserRepository;
// import com.fs.freelancersphere.model.auth.UserRegisterRequest;
import com.fs.freelancersphere.model.auth.UserRegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String register(com.fs.freelancersphere.model.auth.UserRegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email is already registered.";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : Role.FREELANCER);

        userRepository.save(user);
        return "User registered successfully.";
    }
    
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail());
    }

}
