import express from "express";
import {
  getPosts,
  getaPost,
  addPost,
  deletePost,
  updatePost,
  getRelatedPosts,
} from "../controllers/crud.js"; // Importing CRUD controller functions
import { authorizeToken } from "../middleware/authorizeToken.js"; // Importing middleware for authorization

const router = express.Router(); // Create a new Express router

// Route to fetch all posts
// GET /
// Calls the 'getPosts' controller function
router.get("/", getPosts);

// Route to fetch a specific post by ID
// GET /:id
// Calls the 'getaPost' controller function with the post ID as a parameter
router.get("/:id", getaPost);

// Route to fetch related posts based on a specific post ID
// GET /:id/related
// Calls the 'getRelatedPosts' controller function with the post ID as a parameter
router.get("/:id/related", getRelatedPosts);

// Route to add a new post
// POST /
// This route is protected by the 'authorizeToken' middleware
// Calls the 'addPost' controller function
router.post("/", authorizeToken, addPost);

// Route to delete a specific post by ID
// DELETE /:id
// This route is protected by the 'authorizeToken' middleware
// Calls the 'deletePost' controller function with the post ID as a parameter
router.delete("/:id", authorizeToken, deletePost);

// Route to update a specific post by ID
// PUT /:id
// This route is protected by the 'authorizeToken' middleware
// Calls the 'updatePost' controller function with the post ID as a parameter
router.put("/:id", authorizeToken, updatePost);

export default router;
