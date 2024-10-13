const User = require("./../../models/user.model");
const calculateCarbonFootprint = require("./../../utils/calculateCarbonFootprint");
const trackCarbonFootprint = async (req, res) => {
  const { transportationEmission, energyConsumption, wasteDisposal } = req.body;
  const userId = req.userId;

  // Input validation
  if (
    !userId ||
    isNaN(transportationEmission) ||
    isNaN(energyConsumption) ||
    isNaN(wasteDisposal)
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and must be valid numbers." });
  }

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Calculate total carbon footprint
    const transportEmissionFactor = 0.24; // kg CO₂ per km for a car
    const energyEmissionFactor = 0.5; // kg CO₂ per kWh for electricity
    const wasteEmissionFactor = 0.75; // kg CO₂ per kg for landfill waste

    const totalTransportEmissions =
      transportationEmission * transportEmissionFactor;
    const totalEnergyEmissions = energyConsumption * energyEmissionFactor;
    const totalWasteEmissions = wasteDisposal * wasteEmissionFactor;

    const totalFootprint =
      totalTransportEmissions + totalEnergyEmissions + totalWasteEmissions;
    // Initialize carbon footprint fields if they are undefined
    user.carbonFootprint = user.carbonFootprint || {
      total: 0,
      transportationEmission: 0,
      energyConsumption: 0,
      wasteDisposal: 0,
    };

    // Update the user's carbon footprint fields
    user.carbonFootprint.transportationEmission += totalTransportEmissions;
    user.carbonFootprint.energyConsumption += totalEnergyEmissions;
    user.carbonFootprint.wasteDisposal += totalWasteEmissions;
    user.carbonFootprint.total += totalFootprint;

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ message: "Carbon footprint tracked successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to track carbon footprint." });
  }
};

module.exports = trackCarbonFootprint;
