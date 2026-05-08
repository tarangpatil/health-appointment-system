package dev.tarangpatil.doctor_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import dev.tarangpatil.doctor_service.model.UserDTO;

@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/api/user/email/{email}")
    public ResponseEntity<UserDTO> getByEmail(@PathVariable String email);

    @GetMapping("/api/user/id/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id);

    @PutMapping("/api/user/email/{email}/role/DOCTOR")
    public ResponseEntity<UserDTO> putRoleDoctorInUserByEmail(@PathVariable String email);
}
