# Connecting Spring Boot to MongoDB Atlas

# MongoDB Integration

We use **MongoDB Atlas**, a cloud-hosted database.

---

## How to Connect

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.

2. Create a database: `FreelanceSphere`

3. Whitelist your IP or allow all (`0.0.0.0/0`).

4. Create a user and copy your URI:
    `mongodb+srv://<username>:<password>@cluster0.mongodb.net/FreelanceSphere`

5. Add this URI in your `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://your_user:your_password@your_cluster/FreelanceSphere

