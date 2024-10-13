const calculateCarbonFootprint = (transport, energy, waste) => {
  // Emission factors (can be adjusted based on actual data)
  const transportEmissionFactor = 0.24; // kg CO₂ per km for a car
  const energyEmissionFactor = 0.5; // kg CO₂ per kWh for electricity
  const wasteEmissionFactor = 0.75; // kg CO₂ per kg for landfill waste

  const transportEmissions = transport * transportEmissionFactor;
  const energyEmissions = energy * energyEmissionFactor;
  const wasteEmissions = waste * wasteEmissionFactor;

  const totalEmissions = transportEmissions + energyEmissions + wasteEmissions;
  // return total footprint
  return {
    totalEmissions,
    transportEmissions,
    energyEmissions,
    wasteEmissions,
  };
};

// Example usage:;

module.exports = calculateCarbonFootprint;
