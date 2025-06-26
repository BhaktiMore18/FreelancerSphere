package com.fs.freelancersphere.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String root() {
        return "🌟 Root endpoint working!";
    }

    @GetMapping("/ping")
    public String ping() {
        return "✅ Ping success!";
    }
}
