const express = require("express");
const {
  storeText,
  getText,
} = require("../controllers/textStorageController.js");

const router = express.Router();

router.post("/", storeText);
router.get("/:hash", getText);

module.exports = router;
