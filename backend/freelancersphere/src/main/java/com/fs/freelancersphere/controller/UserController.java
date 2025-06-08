package com.fs.freelancersphere.controller;

import com.fs.freelancersphere.model.User;
import com.fs.freelancersphere.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<User> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return repo.save(user);
    }
}
