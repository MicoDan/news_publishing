README
Application Setup and Usage
This README provides instructions on setting up and running the application, including the complete source code, database setup, and authentication process.

Prerequisites
Before setting up the application, ensure you have the following installed:

Node.js (version 14 or later)
npm (Node Package Manager)
PostgreSQL (version 12 or later)
Installation

Clone the Repository:

```bash
Copy code
git clone <repository-url>
cd <repository-directory>
Install Dependencies:
```

```bash
Copy code
npm install
Environment Variables:
```

Create a .env file in the root directory and add the following environment variables:

plaintext
Copy code

```
DATABASE_URL=your_database_connection_string
JWT_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
Database Setup

Create Database and Tables:

Use the following SQL script to create the necessary database tables and insert sample data:

sql
Copy code
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

INSERT INTO users (username, email, password) VALUES
('testuser', 'testuser@example.com', 'hashed_password_here');

Start the Server:

bash
Copy code
npm start
The server should now be running on http://localhost:3000.

API Endpoints
Authentication:

POST /auth/register: Register a new user
POST /auth/login: Login a user
POST /auth/logout: Logout a user
Posts:

GET /posts: Get all posts
GET /posts/:id: Get a specific post
GET /posts/:id/related: Get related posts
POST /posts: Add a new post (requires authentication)
DELETE /posts/:id: Delete a post (requires authentication)
PUT /posts/:id: Update a post (requires authentication)
Comments:

POST /comments: Add a new comment (requires authentication)
GET /comments/:post_id: Get comments for a specific post
DELETE /comments/:id: Delete a comment (requires authentication)
Users:

GET /users: Get all users
Upload:

POST /upload: Upload an image
Authentication Process
User Registration
Endpoint:

POST /auth/register

Request Body:

json
Copy code
{
    "username": "your_username",
    "email": "your_email@example.com",
    "password": "your_password"
}
Response:

200 OK: User has been successfully created.
409 Conflict: User or email already exists.
500 Internal Server Error: Internal server error.
User Login
Endpoint:

POST /auth/login

Request Body:

json
Copy code
{
    "username": "your_username",
    "password": "your_password"
}
Response:

200 OK: Login successful. Sets a JWT token in a cookie.
404 Not Found: Username or email not found.
400 Bad Request: Password incorrect.
500 Internal Server Error: Internal server error.
User Logout
Endpoint:

POST /auth/logout

Response:

200 OK: Logged out successfully.
Adding New Users and Assigning Roles
To add a new user, use the registration endpoint as described above. Currently, there are no roles implemented in the provided code. For assigning roles, you would need to extend the user model and adjust the authentication middleware to check for roles.

Notes
Ensure your database is running and accessible.
Update the connection string and other environment variables as per your setup.
The application uses JWT for authentication. Keep your JWT secret key safe and secure.
Cloudinary is used for image uploads. Ensure you have a Cloudinary account and set the required environment variables.
License
This project is licensed under the MIT License.

Contact
For any queries or issues, please contact [your_email@example.com].