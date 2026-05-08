package dev.tarangpatil.doctor_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.tarangpatil.doctor_service.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    public Optional<Doctor> findByUserId(Long userId);
}
