import express from "express";
import cors from "cors"; 
import authRoutes from "./routes/auth.js"; // Importing authentication routes
import postsRoutes from "./routes/posts.js"; // Importing post-related routes
import commentRoutes from './routes/comments.js' //Importing comment routes
import usersRoutes from "./routes/users.js"; // Importing user-related routes
import uploadRoutes from "./routes/upload.js"; // Importing file upload routes
import cookieParser from "cookie-parser"; // Importing middleware to parse cookies

const app = express(); // Creating an Express application instance
const port = 5000; // Defining the port number for the server

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable CORS with specific options
app.use(
  cors({
    credentials: true, // Allow credentials (cookies) to be sent with requests
    origin: ['http://localhost:5173',  'https://blitzbee.onrender.com'], // Specify allowed origins
  })
);



// Route to handle GET requests to the root URL
// Responds with a simple JSON message
app.get("/", (req, res) => {
  res.json("Hello");
});

// Authentication routes
// Handles routes related to user authentication (e.g: login, register)
app.use("/auth", authRoutes);

// Post routes
// Handles routes related to posts (e.g: creating, reading, updating, deleting posts)
app.use("/posts", postsRoutes);

// Comment routes
// Handles routes related to comments (e.g: creating, reading, updating, deleting posts)
app.use("/comments", commentRoutes);

// User routes
// Handles routes related to user data (e.g: fetching user profiles)
app.use("/users", usersRoutes);

// Upload routes
// Handles routes related to file uploads
app.use("/upload", uploadRoutes);

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log("Server running on port:", port);
});
