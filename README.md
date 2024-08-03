
This README provides instructions on setting up and running the application, including the complete source code, database setup, and authentication process. <br>

Prerequisites
Before setting up the application, ensure you have the following installed:

Technologies used <br>

React (Typescript)
NodeJS
PostegreSQL

Node.js (version 14 or later) <br>
npm (Node Package Manager) <br>
PostgreSQL (version 12 or later)<br><br>
Installation

Clone the Repository:

```bash
git clone https://github.com/MicoDan/blog-pern.git
cd frontend | cd backend

```
Install Dependencies:<br>

```bash
npm install
```
<br><br>

Environment Variables:<br><br>

Create a .env file in the backend and add the following environment variables:

<br>

```bash
DATABASE_URL = your_database_connection_string
JWT_KEY = your_jwt_secret_key
CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_SECRET_KEY = your_cloudinary_secret_key

```
Database Setup :

Create Database and Tables:

Use the following SQL script to create the necessary database tables and insert sample data:

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255)
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255),
    img VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uid INTEGER REFERENCES users(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    user_id INTEGER REFERENCES users(id),
    comment TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
<br>
On the POSTS table the user is also regarded as the author if he/she creates/adds a post. <br>

Start the Server:

```bash
frontend
npm run dev
The server should now be running on http://localhost:5173.

backend
npm start
The server should now be running on http://localhost:5000.
```

API Endpoints<br><br>

Authentication:<br><br>

```
POST /auth/register: Register a new user
POST /auth/login: Login a user
POST /auth/logout: Logout a user
```
<br><br>

Posts:<br><br>

```
GET /posts: Get all posts
GET /posts/:id: Get a specific post
GET /posts/:id/related: Get related posts
POST /posts: Add a new post (requires authentication)
DELETE /posts/:id: Delete a post (requires authentication)
PUT /posts/:id: Update a post (requires authentication)

```

!!! The user is also the author on a post once he/she adds a post in this case !!!

<br><br>

Comments:<br><br>

```
POST /comments: Add a new comment (requires authentication)
GET /comments/:post_id: Get comments for a specific post
DELETE /comments/:id: Delete a comment (requires authentication)
PUT /comments/:id Update a comment (requires authentication)
```
<br><br>

Users:<br><br>
```
GET /users: Get all users
```
<br><br>

Upload<br><br>

```
POST /upload: Upload an image
```
<br><br>
Authentication Process<br><br>
User Registration
Endpoint:<br><br>
<br>
POST /auth/register

Request Body:

```json

{
    "username": "your_username",
    "email": "your_email@example.com",
    "password": "your_password"
}
```
<br><br>

Response:<br><br>

```
200 OK: User has been successfully created.
409 Conflict: User or email already exists.
500 Internal Server Error: Internal server error.
```
<br><br>

User Login<br><br>

Endpoint:<br><br>

POST /auth/login
<br><br>

Request Body:<br><br>

```json
{
    "username": "your_username",
    "password": "your_password"
}
```
<br><br>
Response:<br><br>

```
200 OK: Login successful. Sets a JWT token in a cookie.
404 Not Found: Username or email not found.
400 Bad Request: Password incorrect.
500 Internal Server Error: Internal server error.
```
<br><br>

User Logout
<br><br>
Endpoint:<br><br>

POST /auth/logout
<br><br>
Response:<br><br>

200 OK: Logged out successfully.

Author
Mico Dan

Contact
For any queries or issues, please contact [micodan369@gmail.com].
