const express = require("express");
const { transfer } = require("../controllers/smartContractController.js");

const router = express.Router();

router.post("/", transfer);

module.exports = router;
