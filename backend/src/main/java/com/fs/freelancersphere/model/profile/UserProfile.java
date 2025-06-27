package com.fs.freelancersphere.model.profile;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "user_profiles")
public class UserProfile {

    @Id
    private String id;

    private String userId; // Link to User

    private String fullName;

    private String bio;

    private String location;

    private String profilePictureUrl;

    private String linkedinUrl;

    private String portfolioUrl;

    private List<String> skills;

    private List<UserProfileRequest.Experience> experiences;

    private List<UserProfileRequest.Education> education;

    private List<String> certifications;
}
