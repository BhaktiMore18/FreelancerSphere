import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

import com.fs.freelancersphere.model.User; // adjust this too
import com.fs.freelancersphere.repository.UserRepository; // adjust if your package differs


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) return "User not found";

        User user = userOpt.get();

        if (passwordEncoder.matches(password, user.getPassword())) {
            return "Login successful"; // Here we can return JWT Token
        } else {
            return "Invalid credentials";
        }
    }
}
