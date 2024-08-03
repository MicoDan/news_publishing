import express from "express";
import { getUsers } from "../controllers/users.js"; // Importing the getUsers controller function

const router = express.Router();

// Route to fetch all users
// GET /
// Calls the 'getUsers' controller function to retrieve a list of users
router.get("/", getUsers);

export default router;
