const Tip = require("./../../models/tip.model");

// Controller to add a new tip
const addTip = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.userId; // Assuming userId is added to the request after authorization

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const newTip = new Tip({
      message,
      user: userId,
    });

    await newTip.save();
    return res
      .status(201)
      .json({ message: "Tip added successfully", tip: newTip });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add the tip" });
  }
};

module.exports = addTip;
