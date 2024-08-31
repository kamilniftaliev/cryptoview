const process = require("process");
const moment = require("moment");

const etherscanQuery = async (urlParams) => {
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

  if (!etherscanApiKey.length) {
    throw new Error(
      "Please add ETHERSCAN_API_KEY variable to your environment variables"
    );
  }

  const params = new URLSearchParams({
    sort: "desc",
    page: 1,
    offset: 5,
    apikey: etherscanApiKey,
    ...urlParams,
  });

  const response = await fetch(`https://api.etherscan.io/api?${params}`);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${await response.text()}`);
  }

  const object = await response.json();

  return object.result;
};

const getBlocksByDate = async (startDate, endDate) => {
  let startblock = 0;
  let endblock = "latest";

  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  if (startMoment.isValid()) {
    const blockNumber = await etherscanQuery({
      module: "block",
      action: "getblocknobytime",
      timestamp: startMoment.unix(),
      closest: "after",
    });

    const isValidBlockNumber = Number.isInteger(+blockNumber);
    if (isValidBlockNumber) startblock = +blockNumber;
  }

  if (endMoment.isValid()) {
    const blockNumber = await etherscanQuery({
      module: "block",
      action: "getblocknobytime",
      timestamp: endMoment.unix(),
      closest: "before",
    });

    const isValidBlockNumber = Number.isInteger(+blockNumber);
    if (isValidBlockNumber) endblock = +blockNumber;
  }

  return {
    startblock,
    endblock,
  };
};

module.exports = {
  etherscanQuery,
  getBlocksByDate,
};
