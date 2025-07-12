package com.fs.freelancersphere.controller;

import com.fs.freelancersphere.model.profile.UserProfileRequest;
import com.fs.freelancersphere.model.profile.UserProfile;
import com.fs.freelancersphere.security.CustomUserDetails;
import com.fs.freelancersphere.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/update")
public ResponseEntity<String> updateProfile(@Valid @RequestBody UserProfileRequest profileRequest,
                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
    profileService.updateUserProfile(profileRequest, userDetails.getUser());
    return ResponseEntity.ok("Profile updated successfully.");
}


    @GetMapping
    public ResponseEntity<UserProfile> getProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return profileService.getProfileByUserId(userDetails.getUser().getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
