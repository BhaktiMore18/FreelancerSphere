package com.fs.freelancersphere.repository;
import java.util.Optional;


import com.fs.freelancersphere.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
