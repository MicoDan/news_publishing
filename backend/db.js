import pkg from "pg"; // Importing the 'pg' package for interacting with PostgreSQL
const { Pool } = pkg; // Extracting the 'Pool' class from the 'pg' package for managing a pool of client connections
import dotenv from "dotenv"; // Importing 'dotenv' to manage environment variables

dotenv.config(); // Load environment variables from a .env file into process.env

// Creating a new pool of database connections using configuration from environment variables
const db = new Pool({
  connectionString: process.env.DATABASE_URL, // The connection string for connecting to the PostgreSQL database
  ssl: false, // SSL (Secure Sockets Layer) is disabled.
});

export default db;
