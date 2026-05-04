package dev.tarangpatil.user_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.tarangpatil.user_service.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    public Optional<Users> findByEmail(String email);
}
