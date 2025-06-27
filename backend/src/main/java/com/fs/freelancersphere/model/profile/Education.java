package com.fs.freelancersphere.model.profile;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {
    private String institution;
    private String degree;
    private String fieldOfStudy;
    private String duration; // e.g. "2018 - 2022"
    private String description;
}
