import express from "express";
import { register, login, logout } from "../controllers/auth.js"; // Importing authentication controllers

const router = express.Router(); // Creating a new Express router

// Route to handle user registration
// POST /register
// Calls the 'register' controller function
router.post("/register", register);

// Route to handle user login
// POST /login
// Calls the 'login' controller function
router.post("/login", login);

// Route to handle user logout
// POST /logout
// Calls the 'logout' controller function
router.post("/logout", logout);

// Export the configured router to be used in the main application
export default router;
