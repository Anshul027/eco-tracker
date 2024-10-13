const jwt = require("jsonwebtoken");
const User = require("./../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    // Check if token exists in the headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication token missing." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_LOGIN);
    // Find the user based on the decoded token's user ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Attach the user to the request object for future access
    req.userId = decoded.userId;
    req.user = user;
    next();
  } catch (err) {
    // Handle various errors
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
    } else if (err.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json({ error: "Invalid token. Please log in again." });
    }

    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};

module.exports = isAuthenticated;
// goals schema user associated goals
// goals si
