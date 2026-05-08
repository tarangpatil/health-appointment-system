package dev.tarangpatil.user_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.tarangpatil.user_service.model.Role;
import dev.tarangpatil.user_service.model.UserDTO;
import dev.tarangpatil.user_service.model.Users;
import dev.tarangpatil.user_service.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody Users user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/email/{email}")
    public UserDTO getByEmail(@PathVariable String email) {
        return userService.getByEmail(email);
    }

    @GetMapping("/id/{id}")
    public UserDTO getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PutMapping("/email/{email}/role/{role}")
    public UserDTO addRole(@PathVariable String email, @PathVariable Role role) {
        return userService.addRole(email, role);
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user) {
        return userService.generateToken(user);
    }

}
