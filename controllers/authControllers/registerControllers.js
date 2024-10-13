const bcrypt = require("bcrypt");
const User = require("./../../models/user.model.js"); // Adjust the path as needed
const generateToken = require("./../../utils/genrateJwtToken.js");
// Register User Controller
const registerUser = async (req, res) => {
  try {
    const { email, password, passwordConfirm, role } = req.body;

    // Validate email, password, and password confirmation
    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Validate role (only "admin" or "user" allowed)
    const validRoles = ["user", "admin"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user (with role defaulting to "user" if not provided)
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user", // Default role to "user" if not provided
    });

    // Generate JWT token for the user
    const expirationTime = "9999d"; // Adjust expiration as needed
    const token = generateToken(
      newUser._id,
      expirationTime,
      process.env.JWT_SECRET_LOGIN
    );

    // Convert the document to plain object to modify it
    const userResponse = newUser.toObject();

    // Remove the password field before sending the response
    delete userResponse.password;

    // Send response
    res.status(201).json({
      status: "success",
      data: {
        user: userResponse, // Sending the user without the password
        token,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = registerUser;
