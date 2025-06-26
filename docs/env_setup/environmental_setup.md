# Setting up the Development Environment

## Prerequisites

- Java 17+
- Maven
- IntelliJ or VS Code (your choice)
- MongoDB Atlas account (free tier)
- Internet connection

---

## Steps

1. **Clone the project**
   ```bash
   git clone https://github.com/FreelancerSphere.git
   cd FreelancerSphere
  ```

2. Create .env or application.properties
Add the following:
```bash
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.mongodb.net/FreelanceSphere
```

3. Build and Run the project
```bash
./mvnw spring-boot:run
```

Navigate to: http://localhost:8080

Your backend should be running here!