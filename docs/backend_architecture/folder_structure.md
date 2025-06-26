
##  Folder Structure (simplified)

+---src
    \---main
        \---java
            \---com.fs.freelancersphere
                +---config
                |       AppConfig.java
                |       SecurityConfig.java
                +---controller
                |       AuthController.java
                +---model
                |       User.java
                +---repository
                |       UserRepository.java
                +---service
                |       AuthService.java
                +---security
                |       JwtUtil.java
                |       JwtFilter.java
                FreelancersphereApplication.java

---

### Key Concepts

- **Controller** – receives HTTP requests (`/api/auth/register`)
- **Service** – contains business logic (hash password, check login)
- **Model** – represents MongoDB documents
- **Repository** – interface for DB operations
- **Security** – handles JWT and password encryption
