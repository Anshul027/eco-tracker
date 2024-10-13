const express = require("express");
const trackCarbonFootprint = require("./../controllers/trackCarbonFPControllers/calculateCFPController");
const router = express.Router();

router.post("/", trackCarbonFootprint);
module.exports = router;
