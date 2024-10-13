const bcrypt = require("bcrypt");
const User = require("./../../models/user.model.js");
const generateToken = require("./../../utils/genrateJwtToken.js");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isCorrectPassword) {
      return res
        .status(401)
        .json({ error: "Email or password is not correct..!" });
    }
    const expirationTime = "9999d";
    const token = generateToken(
      user._id,
      expirationTime,
      process.env.JWT_SECRET_LOGIN
    );

    res.status(200).json({
      message: "Successful login",
      data: {
        email: user.email,
        token,
        carbonFootprint: user.carbonFootprint,
      },
    });
  } catch (error) {
    console.log("Error while login :", error.message);
    res.status(400).send({ error: "Internal Server Error" });
  }
};

module.exports = loginUser;
