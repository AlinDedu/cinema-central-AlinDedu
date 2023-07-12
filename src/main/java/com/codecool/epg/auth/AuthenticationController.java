package com.codecool.epg.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        System.out.println(request);
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/check-username")
    public ResponseEntity<UsernameAvailabilityResponse> checkUsernameAvailability(@RequestParam String username) {
        boolean isUsernameAvailable = service.checkUsernameAvailability(username);
        return ResponseEntity.ok(new UsernameAvailabilityResponse(isUsernameAvailable));
    }
}
