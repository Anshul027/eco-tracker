const express = require("express");
const addTip = require("./../controllers/tipsControllers/addTipController");
const getAllTips = require("./../controllers/tipsControllers/getTipController");
const router = express.Router();

// set tip
router.post("/", addTip);
router.get("/", getAllTips);
// router.delete("/:id",)
// get tip
// delete tip

module.exports = router;
