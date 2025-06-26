# Authentication Module - FreelanceSphere Backend

This documentation explains the **Authentication System** of the FreelanceSphere project in a **simple and beginner-friendly** way. It’s structured to help any developer (beginner or advanced) understand how registration and login are implemented securely using **Spring Boot**, **MongoDB**, and **JWT (JSON Web Token)**.

---

## Table of Contents

1. [Project Stack Overview](#project-stack-overview)
2. [Authentication Flow Summary](#authentication-flow-summary)
3. [Register API](#register-api)
4. [Login API](#login-api)
5. [JWT Token - What & Why](#jwt-token---what--why)
6. [MongoDB Notes](#mongodb-case-sensitivity-warning)
7. [Security Configurations](#security-configurations)
8. [Repository Layer](#repository-layer)
9. [Troubleshooting Tips](#troubleshooting-tips)
10. [Future Improvements](#future-improvements)

---

## Project Stack Overview

* **Backend**: Spring Boot (Java)
* **Database**: MongoDB Atlas (Cloud DB)
* **Authentication**: JWT (Token-based Auth)
* **Password Hashing**: BCrypt (Industry Standard)
* **Logging**: Spring’s built-in logger

---

## Authentication Flow Summary

```
Frontend -> /register (POST) -> Save new user in MongoDB with hashed password
Frontend -> /login (POST) -> Validate password & generate JWT token
```

User credentials never get stored in plain text. Instead:

* Passwords are **hashed** (not encrypted) using BCrypt.
* JWT token is generated only after successful login.

---

## Register API

### Endpoint

```
POST /api/auth/register
```

### What does it do?

This endpoint creates a new user in the MongoDB database.

### Request Body

```json
{
  "username": "bhakti",
  "email": "bhakti@example.com",
  "password": "secure123"
}
```

### Behind the scenes

* Validates data.
* Hashes the password using `BCryptPasswordEncoder`.
* Saves user to MongoDB using Spring Data Repository.

### Response (Success)

```json
{
  "message": "User registered successfully"
}
```

### Common Errors

* `409 Conflict`: Email already exists
* `500 Internal Server Error`: MongoDB conflict (case-sensitive DB name issues)

---

## Login API

### Endpoint

```
POST /api/auth/login
```

### What does it do?

Checks email + password and returns a JWT token if valid.

### Request Body

```json
{
  "email": "bhakti@example.com",
  "password": "secure123"
}
```

### What’s happening internally?

* Retrieves user by email
* Validates password using BCrypt’s `.matches()` method
* On success, generates a JWT token (valid for certain time period)

### Response (Success)

```json
{
  "token": "<JWT_TOKEN>"
}
```

### Common Errors

* `401 Unauthorized`: Invalid password or email
* `500 Internal`: User not found or DB issue

---

## JWT Token - What & Why

* JWT stands for **JSON Web Token**.
* It’s a secure token that proves the user is logged in.
* Sent in HTTP headers to access protected routes (e.g. posting a job).

JWT structure: `header.payload.signature`

* Token includes user info (like `userId`) but never the password.

---

## MongoDB Case Sensitivity Warning

> MongoDB treats `FreelanceSphere` and `freelancesphere` as **two different databases**.

**Fix**: Make sure your connection string and Spring Boot configuration match exactly in case:

```yaml
spring:
  data:
    mongodb:
      database: FreelanceSphere
```

---

## Security Configurations (Spring Security)

* `/api/auth/**` is public (does not require login)
* All other APIs are protected (require valid JWT)
* Uses filter to extract token from headers and validate it

---

## Repository Layer

File: `UserRepository.java`

```java
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
}
```

Used for:

* Finding user during login
* Checking duplicate email during registration

---

## Troubleshooting Tips

| Problem                  | Reason                              | Fix                                                            |
| ------------------------ | ----------------------------------- | -------------------------------------------------------------- |
| 405 METHOD\_NOT\_ALLOWED | Sending GET instead of POST         | Use Postman or frontend to send POST                           |
| 409 Conflict             | Duplicate email or DB case mismatch | Check MongoDB & Spring config                                  |
| Password doesn't match   | Password was not hashed on save     | Make sure register route uses `BCryptPasswordEncoder.encode()` |
| JWT token not generated  | Login logic failed                  | Ensure `BCrypt.matches()` is used + JWT is returned            |

---

## Future Improvements

* Refresh tokens
* Logout functionality
* Role-based access (admin vs freelancer)
* Email verification / OTP
* Swagger UI / OpenAPI docs

---

If you have suggestions or contributions, feel free to open an issue or a PR! 

> **Pro Tip**: Add Swagger/OpenAPI support next so this becomes interactive.

