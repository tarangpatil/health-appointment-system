package dev.tarangpatil.doctor_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.tarangpatil.doctor_service.model.Doctor;
import dev.tarangpatil.doctor_service.model.DoctorDTO;
import dev.tarangpatil.doctor_service.service.DoctorService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/doctor")
@AllArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping("/register")
    public ResponseEntity<DoctorDTO> register(@RequestBody Doctor doctor) {
        return new ResponseEntity<DoctorDTO>(doctorService.createDoctor(doctor), HttpStatus.CREATED);
    }

    @GetMapping("/id/{userId}")
    public DoctorDTO getByUserId(@ PathVariable Long userId) {
        return doctorService.getByUserId(userId);
    }
}
