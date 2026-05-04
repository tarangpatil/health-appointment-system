package dev.tarangpatil.user_service.model;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private Set<String> roles;

    public UserDTO(Users user) {
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.roles = new HashSet<>();
        for (Role role : user.getRoles())
            this.roles.add(role.name());
    }
}
