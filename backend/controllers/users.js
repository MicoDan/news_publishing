import db from "../db.js"; // Importing the database connection

/**
 * Get All Users
 * Fetching all users from the database and returns them in the response.
 */
export const getUsers = async (req, res) => {
  try {
    // Defining the SQL query to select all users from the 'users' table
    const q = "SELECT * FROM users";
    
    // Executing the query and store the result
    const data = await db.query(q);
    
    // Responding with the rows of the result set
    res.json(data.rows);
    
    // Logging the result data for debugging purposes
    console.log(data);
  } catch (err) {
    // Logging any errors that occur during the query execution
    console.log(err);
    
    // Responding with the error message
    res.json(err);
  }
};
