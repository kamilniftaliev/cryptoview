// 4. Token Balance Lookup

const { isAddress } = require("web3-validator");
const { getWeb3 } = require("../helpers/web3.js");
const { ABI } = require("../constants/balance.js");

const getBalance = async (req, res) => {
  const { contractAddress, walletAddress } = req.params;

  if (!isAddress(contractAddress)) {
    return res.status(422).json({
      error: "Invalid contract address",
    });
  }

  if (!isAddress(walletAddress)) {
    return res.status(422).json({
      error: "Invalid wallet address",
    });
  }

  try {
    const web3 = getWeb3();

    const contract = new web3.eth.Contract(ABI, contractAddress);

    const rawBalance = await contract.methods.balanceOf(walletAddress).call();

    const formattedBalance = web3.utils.fromWei(rawBalance, "ether");

    return res.status(200).json({
      balance: formattedBalance,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getBalance,
};
