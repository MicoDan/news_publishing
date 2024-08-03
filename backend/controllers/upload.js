import cloudinary from "../utils/cloudinary.js"; // Importing the Cloudinary utility

/**
 * Upload Image
 * Handles image upload to Cloudinary and returns the secure URL of the uploaded image.
 */
export const upload = async (req, res) => {
  try {
    // Uploading the image to Cloudinary using the file path provided in the request
    const data = await cloudinary.uploader.upload(req.file.path);
    
    // Logging the file path for debugging purposes
    console.log(req.file.path);

    // Responding with the secure URL of the uploaded image
    res.status(200).json(data.secure_url);
  } catch (err) {
    // Handling any errors that occur during the upload process
    res.status(500).json(err);
  }
};
