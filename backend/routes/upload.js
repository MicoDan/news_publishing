import express from "express";
import { upload } from "../controllers/upload.js"; // Importing the upload controller function
import { uploadMulter } from "../middleware/multer.js"; // Importing the configured Multer instance for file uploads

const router = express.Router();

// Route to handle file uploads
// POST /
// Uses the 'uploadMulter' middleware to handle single file uploads with the form field name 'file'
// Calls the 'upload' controller function after the file is successfully uploaded
router.post("/", uploadMulter.single("file"), upload);

export default router;
