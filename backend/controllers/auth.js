import db from "../db.js"; // Importing the database module
import bcrypt from "bcryptjs"; // Importing bcrypt for hashing passwords
import jwt from "jsonwebtoken"; // Importing JWT for token generation

/**
 * User Registration
 * This function handles the registration of a new user.
 * It checks if the user already exists by username or email, 
 * hashes the password, and then inserts the new user into the database.
 */
export const register = async (req, res) => {
  // Query to check if the user already exists
  let query = `SELECT * FROM users WHERE username = $1 OR email = $2`;
  try {
    // Executing the query to check for existing user
    const data = await db.query(query, [req.body.username, req.body.email]);
    if (data.rows.length)
      return res.status(409).json("User or email already exists");

    // Hashing the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Querying to insert the new user into the database
    query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    await db.query(query, [req.body.username, req.body.email, hashedPassword]);
    res.status(200).json("User has been successfully created");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

/**
 * User Login
 * This function handles user login.
 * It checks if the user exists by username or email, verifies the password,
 * generates a JWT token, and sets it in a cookie.
 */
export const login = async (req, res) => {
  // Query to find the user by username or email
  let query = `SELECT * FROM users WHERE username = $1 OR email = $1`;
  try {
    // Executing the query to find the user
    const data = await db.query(query, [req.body.username]);

    if (data.rows.length === 0)
      return res.status(404).json("Username or email not found");

    // Comparing the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      data.rows[0].password
    );
    if (!isPasswordCorrect) return res.status(400).json("Password incorrect");

    // Generating a JWT token
    const token = jwt.sign({ id: data.rows[0].id }, process.env.JWT_KEY);

    // Excluding the password from the user data
    const { password, ...otherInformation } = data.rows[0];

    // Setting the JWT token in a cookie and returning the user information
    return res
      .cookie("access_token", token, {
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true, // The cookie can only be transmitted over https
        sameSite: "none", // The cookie will only be sent if the request is being made to the same site
        maxAge: 3600000, // The cookie will expire after 1 hour (3600000 milliseconds)
      })
      .status(200)
      .json(otherInformation);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

/**
 * User Logout
 * This function handles user logout.
 * It clears the JWT token cookie.
 */
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none", // The cookie will only be sent if the request is being made to the same site
      secure: true, // The cookie can only be transmitted over https
    })
    .status(200)
    .json("Logged out successfully");
};
