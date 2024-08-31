// 2. Simple Cryptocurrency Transaction Tracking

const TxTrackingSchema = require("../models/txTrackingModel.js");
const { etherscanQuery, getBlocksByDate } = require("../helpers/etherscan.js");

const getTrackingData = async (req, res) => {
  try {
    const { address } = req.params;
    const { startDate, endDate } = req.query;

    const { startblock, endblock } = await getBlocksByDate(startDate, endDate);

    const transactions = await etherscanQuery({
      module: "account",
      action: "txlist",
      address,
      startblock,
      endblock,
    });

    if (transactions.length) {
      await TxTrackingSchema.create(transactions);
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      error:
        error.message || "Something went wrong while fetching NFT Metadata.",
    });
  }
};

module.exports = { getTrackingData };
