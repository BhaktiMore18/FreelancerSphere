# Setting up the Development Environment

## Prerequisites

- Java 17+
- Maven
- IntelliJ or VS Code (your choice)
- MongoDB Atlas account (free tier)
- Internet connection

---

## Steps
- Spring-boot version used: 3.5.3
- Spring version: 6.2.7

1. **Clone the project**
   ```bash
   git clone https://github.com/FreelancerSphere.git
   cd FreelancerSphere
  ```
2. **Running the Frontend**
```bash
cd frontend
npm install
npm start
```

3. Running the Backend
```bash
cd backend
./mvnw spring-boot:run
```

3. Create .env or application.properties
Add the following (Please modify the username, password, and cluster name to match your own configuration.):
```bash
mongodb+srv://<username>:<password>@<cluster-name>.<random-id>.mongodb.net/?retryWrites=true&w=majority
```

Ensure MongoDB is connected correctly via application.properties.

## Docker Setup
Both backend and frontend are Dockerized.

1. **Backend Docker Build and Run**
```bash
cd backend
docker build -t bhaktimore05/freelancersphere-backend .
docker run -p 8080:8080 bhaktimore05/freelancersphere-backend
```

2. **Frontend Docker Build and Run**
```bash
cd frontend
docker build -t bhaktimore05/freelancersphere-frontend .
docker -p 3000:3000 bhaktimore05/freelancersphere-frontend
```

Navigate to: http://localhost:8080 for backend! and http://localhost:3000 for frontend!