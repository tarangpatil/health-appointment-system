package dev.tarangpatil.user_service.service;

import java.util.HashSet;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import dev.tarangpatil.user_service.model.Role;
import dev.tarangpatil.user_service.model.UserDTO;
import dev.tarangpatil.user_service.model.Users;
import dev.tarangpatil.user_service.repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    public UserDTO createUser(Users user) {
        if (user.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id cannot be provided");
        try {
            user.setPasswordHash(encoder.encode(user.getPasswordHash()));
            user.setRoles(new HashSet<>());
            Users savedUser = userRepo.save(user);
            return new UserDTO(savedUser);
        } catch (RuntimeException e) {
            System.err.println(e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    public UserDTO getByEmail(String email) {
        return new UserDTO(userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found")));
    }

    public UserDTO addRole(String email, Role role) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found"));

        if (user.getRoles() == null)
            user.setRoles(new HashSet<>());

        user.getRoles().add(role);
        return new UserDTO(userRepo.save(user));
    }
}
