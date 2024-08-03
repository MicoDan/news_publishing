import { v2 as cloudinary } from "cloudinary"; // Importing the v2 version of the Cloudinary library

// Configuring Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // The cloud name associated with your Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY,       // The API key for authenticating requests to Cloudinary
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // The API secret for securing interactions with Cloudinary
});

export default cloudinary;
