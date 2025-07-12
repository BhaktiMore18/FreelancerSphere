
##  Folder Structure (simplified)
```md
+---src
    \---main
        \---java
            \---com.fs.freelancersphere
                +---config
                |       SecurityConfig.java
                +---controller
                |       AuthController.java
                +---model
                |       Role.java
                |       User.java
                |       UserRegisterRequest.java
                +---repository
                |       UserRepository.java
                +---service
                |       AuthService.java
                |       JwtService.java
                +---security
                |       JwtFilter.java
                |       CustomUserDetails.java
                |       CustomUserDetailsService.java
                +---exception
                |       GlobalExceptionHandler.java
                FreelancersphereApplication.java
```
---

### Key Concepts

- **Controller** – receives HTTP requests (`/api/auth/register`)
- **Service** – contains business logic (hash password, check login)
- **Model** – represents MongoDB documents
- **Repository** – interface for DB operations
- **Security** – handles JWT and password encryption
