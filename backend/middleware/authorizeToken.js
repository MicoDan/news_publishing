import jwt from "jsonwebtoken";
import db from "../db.js";

// Ensure the db connection is imported or available
// import db from 'path_to_your_db_configuration';

export const authorizeToken = async (req, res, next) => {
  // Retrieving the token from the request cookies
  const token = req.cookies.access_token;

  // If no token is found, respond with a 401 status (unauthenticated)
  if (!token) return res.status(401).json("You are not authenticated");

  try {
    // Verifying the token using the secret key from environment variables
    const userInfo = jwt.verify(token, process.env.JWT_KEY);

    // Attaching the user information to the request object for further use
    req.user = userInfo;

    // Query to find the user by ID
    const q = "SELECT * FROM users WHERE id = $1";

    // Executing the query and storing the result
    const { rows } = await db.query(q, [userInfo.id]);

    // Check if user exists
    if (rows.length === 0) {
      return res.status(404).json("User not found");
    }

    // Extract user info
    const user = rows[0];

    // Check if the email matches the specified one
    if (user.email !== "menatehawashington@gmail.com") {
      return res
        .status(403)
        .json("You are not authorized to perform this action");
    }

    // Proceeding to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with a 403 status (forbidden)
    return res.status(403).json("Invalid token");
  }
};

export const authorizeUserToken = async (req, res, next) => {
  // Retrieving the token from the request cookies
  const token = req.cookies.access_token;

  // If no token is found, respond with a 401 status (unauthenticated)
  if (!token) return res.status(401).json("You are not authenticated");

  try {
    // Verifying the token using the secret key from environment variables
    const userInfo = jwt.verify(token, process.env.JWT_KEY);

    // Attaching the user information to the request object for further use
    req.user = userInfo;

    // Proceeding to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, respond with a 403 status (forbidden)
    return res.status(403).json("Invalid token");
  }
};
