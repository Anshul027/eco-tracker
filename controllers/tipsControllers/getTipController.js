const Tip = require("./../../models/tip.model");
const User = require("./../../models/user.model");
const moment = require("moment-timezone");

// Controller to get all tips with user names and IST formatted time
const getAllTips = async (req, res) => {
  try {
    // Find tips and populate the user field with the user's name
    const tips = await Tip.find();

    // Format each tip's createdAt time to IST
    const formattedTips = tips.map((tip) => {
      return {
        message: tip.message,
        createdAt: moment(tip.createdAt)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss"), // Format time in IST
      };
    });
    // Send the formatted tips as a response
    return res.status(200).json(formattedTips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve tips" });
  }
};

module.exports = getAllTips;
