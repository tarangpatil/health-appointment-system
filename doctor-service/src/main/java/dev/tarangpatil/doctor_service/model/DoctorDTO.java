package dev.tarangpatil.doctor_service.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DoctorDTO {
    private UserDTO user;
    private String qualification;
    private String specialization;

    public DoctorDTO(UserDTO user, Doctor doctor) {
        this.user = user;
        this.qualification = doctor.getQualification();
        this.specialization = doctor.getSpecialization();
    }
}
