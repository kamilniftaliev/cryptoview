const express = require("express");
const { getBalance } = require("../controllers/balanceController.js");

const router = express.Router();

router.get("/:contractAddress/:walletAddress", getBalance);

module.exports = router;
