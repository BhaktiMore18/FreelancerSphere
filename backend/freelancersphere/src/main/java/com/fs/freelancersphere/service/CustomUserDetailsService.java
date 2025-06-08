package com.fs.freelancersphere.service;

import com.fs.freelancersphere.model.User;
import com.fs.freelancersphere.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Use fully qualified name to avoid ambiguity:
        org.springframework.security.core.userdetails.User.UserBuilder builder = 
            org.springframework.security.core.userdetails.User.withUsername(user.getEmail());

        builder.password(user.getPassword()); // hashed password
        builder.roles("USER"); // default role

        return builder.build();
    }
}
