const process = require("process");
const { Web3 } = require("web3");

const getWeb3 = () => {
  const infuraProjectId = process.env.INFURA_PROJECT_ID;

  if (!infuraProjectId.length) {
    throw new Error(
      "Please add INFURA_PROJECT_ID variable to your environment variables"
    );
  }

  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;

  if (!network.length) {
    throw new Error(
      "Please add ETHEREUM_NETWORK variable to your environment variables"
    );
  }

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${infuraProjectId}`
    )
  );

  return web3;
};

module.exports = {
  getWeb3,
};
