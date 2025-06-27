# User Profile Management

Introduced a profile management system for feelancers and clients to mainatain their personal and professional details.

## Features Added
- UserProfile Entity (`UserProfile.java`):
  Stores information like bio, Linkedin, portfolio, skills, certifications, education, and experience, linked to a `User` by `UserId`.
- ProfileController(`ProfileController.java`):
  `POST /api/profile/update`:Updates or creates the authenticated user's profile.
  `GET /api/profile`:Retrieves the authenticated user's profile.
- UserProfileRequest DTO (`UserProfileRequest.java`):
  Includes backend validation using `@valid`.
  Ensures structured input for `education`, `experience`, etc.
- ProfileService:
  Handles creation and update of user profile.
  Maps `UserProfileRequest` to `UserProfile`.
- Global Exception Handling:
  Returns proper error messages when validation fails.
  Uses `@ControllerAdvice` to catch and format `MethodArgumentNotValidException`.

## Sample API Calls
update Profile (POST `/api/profile/update`):

```json
{
  "bio": "Passionate backend developer.",
  "linkedinUrl": "https://linkedin.com/in/bhaktimore",
  "portfolioUrl": "https://bhaktimore.dev",
  "skills": ["Java", "Spring Boot", "MongoDB"],
  "certifications": ["Oracle Certified Java Developer"],
  "education": [
    {
      "degree": "BTech CSE",
      "institution": "WCE",
      "year": "2026"
    }
  ],
  "experience": [
    {
      "title": "Spring Intern",
      "company": "TechCorp",
      "duration": "2023 - 2024",
      "description": "Built REST APIs using Spring Boot"
    }
  ]
}
```
Use header:
`Authorization: Bearer <JWT_TOKEN>`

Fetch Profile (GET `/api/profile`):
Returns `200 OK` with user's profile or `404 Not Found` if not created yet.