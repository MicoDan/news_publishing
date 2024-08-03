import multer from "multer";

// Configuring storage settings for Multer
const storage = multer.diskStorage({
  // Defining how the file should be named
  filename: function (req, file, cb) {
    // Using the original name of the file
    cb(null, file.originalname);
  },
});

// Exporting a configured Multer instance for file uploads
// This instance uses the storage settings defined above
export const uploadMulter = multer({ storage: storage });
