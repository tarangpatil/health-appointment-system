package dev.tarangpatil.doctor_service.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private Long userId;
    /**
     * Example: MD, DO, DMS, MBBS
     */
    @Column(nullable = false)
    private String qualification;
    /**
     * Example: Oncology, Dermatology, Family Medicine
     */
    @Column(nullable = false)
    private String specialization;
    /**
     * 
     */
    @Column(nullable = false)
    private String medicalLicenseNumber;
}
