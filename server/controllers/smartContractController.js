// 5. Basic Smart Contract Interaction:

const process = require("process");
const { ETH_DATA_FORMAT } = require("web3");
const { isAddress } = require("web3-validator");

const SmartContractSchema = require("../models/smartContractModel.js");
const { getWeb3 } = require("../helpers/web3.js");

const transfer = async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!isAddress(to)) {
      return res.status(422).json({
        error: "Invalid wallet address",
      });
    }

    const signerKey = process.env.SIGNER_PRIVATE_KEY;

    if (!signerKey.length) {
      throw new Error(
        "Please add SIGNER_PRIVATE_KEY variable to your environment variables"
      );
    }

    const chainId = process.env.NETWORK_CHAIN_ID;

    if (!chainId.length) {
      throw new Error(
        "Please add NETWORK_CHAIN_ID variable to your environment variables"
      );
    }

    const web3 = getWeb3();

    const signer = web3.eth.accounts.privateKeyToAccount(signerKey);

    web3.eth.accounts.wallet.add(signer);

    const value = web3.utils.toWei(amount, "ether");

    const gas = await web3.eth.estimateGas(
      {
        from: signer.address,
        to,
        value,
      },
      "latest",
      ETH_DATA_FORMAT
    );

    const tx = {
      from: signer.address,
      to,
      value,
      gas,
      nonce: await web3.eth.getTransactionCount(signer.address),
      maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
      maxFeePerGas: web3.utils.toWei("90", "gwei"),
      chainId,
      type: 0x2,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      signer.privateKey
    );

    console.log("Raw transaction data: " + signedTx.rawTransaction);

    const network = process.env.ETHEREUM_NETWORK;

    const receipt = await web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .once("transactionHash", (txhash) => {
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
      });

    const storedReceipt = await SmartContractSchema.create(receipt);

    res.status(200).json(storedReceipt);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  transfer,
};
