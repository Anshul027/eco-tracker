const User = require("../../models/user.model.js");
const generateToken = require("../../utils/genrateJwtToken.js");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // find the user if exits
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // user verified then send the mail for creating token for 15mins
    const expirationTime = "10m";
    const token = generateToken(
      user._id,
      expirationTime,
      process.env.JWT_SECRET_PASS
    );
    //let me send the first mail
    const subject = "Password change request";
    const content = `
          Hello,

          You requested a password reset. Please click the link below to reset your password:

          Reset Your Password: ${process.env.DOMAIN}/reset-password/auth/${token}

          If you did not request this change, please ignore this email.

          Thank you,
          Ecotrackify
`;

    // await mailService(email, subject, content);
    // const dbToken = new Token({ token });
    // await dbToken.save();
    res
      .status(200)
      .json({ message: "password reset link is send to the email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = forgotPassword;
