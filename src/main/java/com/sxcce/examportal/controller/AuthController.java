
package com.sxcce.examportal.controller;

import com.sxcce.examportal.model.User;
import com.sxcce.examportal.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username and password are required"));
        }

        Optional<User> foundUser =
                userRepository.findByUsername(username);

        if (foundUser.isEmpty()
                || !foundUser.get().getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password"));
        }

        User user = foundUser.get();

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName() == null ? "" : user.getName(),
                "username", user.getUsername(),
                "role", user.getRole() == null ? "STUDENT" : user.getRole()
        ));
    }
}
