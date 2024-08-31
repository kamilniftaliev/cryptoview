const mongoose = require("mongoose");
const { Schema } = mongoose;

const SmartContractSchema = new Schema(
  {
    blockHash: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: String,
      required: true,
    },
    cumulativeGasUsed: {
      type: String,
      required: true,
    },
    effectiveGasPrice: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    gasUsed: {
      type: String,
      required: true,
    },
    logsBloom: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    transactionHash: {
      type: String,
      required: true,
    },
    transactionIndex: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SmartContract", SmartContractSchema);
