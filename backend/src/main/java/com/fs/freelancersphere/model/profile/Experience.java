package com.fs.freelancersphere.model.profile;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {
    private String title;
    private String company;
    private String location;
    private String duration; // e.g. "Jan 2020 - Dec 2021"
    private String description;
}
