package com.fs.freelancersphere.service;

import com.fs.freelancersphere.model.profile.UserProfile;
import com.fs.freelancersphere.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fs.freelancersphere.model.auth.User;
import com.fs.freelancersphere.model.profile.UserProfileRequest;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile createOrUpdateProfile(UserProfile profile) {
        Optional<UserProfile> existing = userProfileRepository.findByUserId(profile.getUserId());
        existing.ifPresent(p -> profile.setId(p.getId())); // retain same ID for update
        return userProfileRepository.save(profile);
    }

    public Optional<UserProfile> getProfileByUserId(String userId) {
        return userProfileRepository.findByUserId(userId);
    }

    public void updateUserProfile(UserProfileRequest request, User user) {
    UserProfile profile = UserProfile.builder()
            .userId(user.getId())
            .fullName(user.getUsername()) // Or let the user edit name separately
            .bio(request.getBio())
            .location(null) // optional field, you can add it in request if needed
            .profilePictureUrl(null) // same, can be added later
            .linkedinUrl(request.getLinkedinUrl())
            .portfolioUrl(request.getPortfolioUrl())
            .skills(request.getSkills())
            .certifications(request.getCertifications())
            .education(request.getEducation())
            .experiences(request.getExperience())
            .build();

    createOrUpdateProfile(profile);
   }
}
