# BackendModel - User Routes API

This project provides a basic **User Management API** built with **Express.js** and **MongoDB**.  
It handles **registration**, **login**, **fetching user data**, and **testing request bodies**.  
Authentication is done using **JWT (JSON Web Tokens)**.

---

## 📂 Routes Overview

| Method | Endpoint | Description |
|:------|:---------|:------------|
| `GET` | `/api/users` | Get all users |
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login an existing user |
| `GET` | `/api/users/user/:id` | Get a single user by ID |
| `POST` | `/api/users/test` | Test request body |

---

## 🚀 How it Works

### 1. Register a User
**Endpoint:** `POST /api/users/register`

- Expects a JSON body with user details (e.g., `name`, `username`, `email`, `password`).
- Automatically generates a **JWT token** after successful registration.
- Example Request Body:
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "mypassword"
}
```

### 2. Login a User
**Endpoint:** `POST /api/users/login`

- Expects `username` and `password` in the request body.
- Verifies credentials and responds with user information.

### 3. Get a Single User by ID
**Endpoint:** `GET /api/users/user/:id`

- Fetches user profile by ID.
- If `id` is `null`, returns an error asking to log in.
- Example:  
  `GET http://localhost:3000/api/users/user/661ab12345abcd`

### 4. Get All Users
**Endpoint:** `GET /api/users`

- Fetches all users from the database.

### 5. Test Endpoint
**Endpoint:** `POST /api/users/test`

- Echoes back the received request body.  
Useful for testing POST requests.

---

## ⚙️ Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/noodkhan/BackendModel.git
   cd BackendModel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file and add your **SECRET_KEY**.
   ```
   SECRET_KEY=your_secret_key_here
   ```

4. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

---

## 🛡️ Important Notes
- **Passwords are not hashed** — this is for demonstration only!  
  👉 You should **hash passwords** using a library like **bcrypt** before deploying to production.
- **SECRET_KEY** must be kept secret and never hardcoded in code.

---

## 📜 Example `.env`
```env
SECRET_KEY=mySuperSecretKey123
```

---

## 🧠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

---

# 📫 Contact
For any questions, feel free to open an issue or contact the repository owner.

---

Would you also like me to create a simple version of it too, if you want a shorter README? 🚀  
(Just in case you want both!)
