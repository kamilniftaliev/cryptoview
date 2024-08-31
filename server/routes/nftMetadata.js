const express = require("express");
const { getNFTMetadata } = require("../controllers/nftMetadataController.js");

const router = express.Router();

router.get("/:address/:tokenId", getNFTMetadata);

module.exports = router;
