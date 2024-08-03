import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/crud.js"; // Importing CRUD controller functions
import { authorizeToken } from "../middleware/authorizeToken.js"; // Importing middleware for authorization

const router = express.Router(); // Create a new Express router

// Route to add a new comment
// POST /
// This route is protected by the 'authorizeToken' middleware
// Calls the 'addComment' controller function
router.post("/", authorizeToken, addComment);

// Route to delete a specific comment by ID
// DELETE /:id
// This route is protected by the 'authorizeToken' middleware
// Calls the 'deleteComment' controller function with the comment ID as a parameter
router.delete("/:id", authorizeToken, deleteComment);

// Route to update a specific comment by ID
// PUT /:id
// This route is protected by the 'authorizeToken' middleware
// Calls the 'updateComment' controller function with the comment ID as a parameter
router.put("/:id", authorizeToken, updateComment);

// Route to fetch all post comments
// GET /
// Calls the 'getComments' controller function
router.get("/:id", getComments);

export default router;