package dev.tarangpatil.doctor_service.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import dev.tarangpatil.doctor_service.client.UserClient;
import dev.tarangpatil.doctor_service.model.Doctor;
import dev.tarangpatil.doctor_service.model.DoctorDTO;
import dev.tarangpatil.doctor_service.model.UserDTO;
import dev.tarangpatil.doctor_service.repository.DoctorRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepo;
    private final UserClient userClient;

    public DoctorDTO createDoctor(Doctor doctor) {
        ResponseEntity<UserDTO> fetchedUser = userClient.getById(doctor.getUserId());
        
        if (!fetchedUser.getStatusCode().is2xxSuccessful())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        
        if (doctor.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        
        Doctor saveDoctor = doctorRepo.save(doctor);
        userClient.putRoleDoctorInUserByEmail(fetchedUser.getBody().getEmail());

        fetchedUser = userClient.getById(doctor.getUserId());

        return new DoctorDTO(fetchedUser.getBody(), saveDoctor);
    }

    public DoctorDTO getByUserId(Long userId) {
        ResponseEntity<UserDTO> fetchedUser = userClient.getById(userId);
        Doctor doctor = doctorRepo.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (!userClient.getById(doctor.getId()).getStatusCode().is2xxSuccessful())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        return new DoctorDTO(fetchedUser.getBody(), doctor);
    }
}
