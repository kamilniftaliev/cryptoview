const express = require("express");
const { getTrackingData } = require("../controllers/txTrackingController.js");

const router = express.Router();

router.get("/:address", getTrackingData);

module.exports = router;
