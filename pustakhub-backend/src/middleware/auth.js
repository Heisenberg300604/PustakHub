import { verifyToken } from "../utils/jwt.js";

export const authenticateToken = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers['authorization'];
  // Get the token from the request headers
  const token = authHeader?.split(' ')[1];

  // If the token is not found
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);
    // Add the user to the request
    req.user = decoded;
    // Call the next middleware
    next();
  } catch (error) {
    // Log the error
    console.error('Token verification error:', error);
    // Send the response
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
