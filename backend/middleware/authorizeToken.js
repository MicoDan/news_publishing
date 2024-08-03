import jwt from "jsonwebtoken"; // Import the JWT library for handling JSON Web Tokens

/**
 * Middleware to Authorize Token
 * Verifies the JWT token from the request cookies and authorizes the user.
 * If the token is valid, the user information is added to the request object and the request proceeds to the next middleware.
 * If the token is invalid or missing, responds with an appropriate error message.
 */
export const authorizeToken = async (req, res, next) => {
  // Retrieving the token from the request cookies
  const token = req.cookies.access_token;

  // If no token is found, I respond with a 401 status (unauthenticated)
  if (!token) return res.status(401).json("You are not authenticated");

  try {
    // Verifying the token using the secret key from environment variables
    const userInfo = jwt.verify(token, process.env.JWT_KEY);
    
    // Attaching the user information to the request object for further use
    req.user = userInfo;
    
    // Proceeding to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, responding with a 403 status (forbidden)
    return res.status(403).json("Invalid token");
  }
};
