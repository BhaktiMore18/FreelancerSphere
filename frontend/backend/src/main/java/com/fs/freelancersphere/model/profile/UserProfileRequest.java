package com.fs.freelancersphere.model.profile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UserProfileRequest {

    @NotBlank(message = "Bio is required")
    @Size(max = 500, message = "Bio must be less than 500 characters")
    private String bio;

    @NotBlank(message = "LinkedIn URL is required")
    private String linkedinUrl;

    @NotBlank(message = "Portfolio URL is required")
    private String portfolioUrl;

    private List<@NotBlank(message = "Skill cannot be blank") String> skills;

    private List<@NotBlank(message = "Certification cannot be blank") String> certifications;

    private List<@jakarta.validation.Valid Education> education;

    private List<@jakarta.validation.Valid Experience> experience;

    @Data
    public static class Education {
        @NotBlank(message = "Degree is required")
        private String degree;

        @NotBlank(message = "Institution is required")
        private String institution;

        @NotBlank(message = "Year is required")
        private String year;
    }

    @Data
    public static class Experience {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Company is required")
        private String company;

        @NotBlank(message = "Duration is required")
        private String duration;

        @NotBlank(message = "Description is required")
        private String description;
    }
}
