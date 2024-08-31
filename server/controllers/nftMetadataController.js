// 1. NFT Metadata Retrieval and Storage

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const process = require("process");

const NFTMetadataSchema = require("../models/nftMetadataModel.js");

const chain = EvmChain.ETHEREUM;

const getNFTMetadata = async (req, res) => {
  try {
    const { address, tokenId } = req.params;

    const moralisApiKey = process.env.MORALIS_API_KEY;

    if (!moralisApiKey.length) {
      return res.status(500).json({
        error:
          "Please add MORALIS_API_KEY variable to your environment variables",
      });
    }

    if (!Moralis.Core.isStarted) {
      await Moralis.start({ apiKey: moralisApiKey });
    }

    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      address,
      chain,
      tokenId,
    });

    const json = response.toJSON();

    const metadata = json.metadata ? JSON.parse(json.metadata) : null;

    if (!metadata) {
      throw "Something wrong with the metadata";
    }

    const nftMetadata = await NFTMetadataSchema.create({
      image: metadata.image,
      name: metadata.name,
      description: metadata.description,
    });

    res.status(200).json(nftMetadata);
  } catch (error) {
    res.status(500).json({
      error:
        error.message || "Something went wrong while fetching NFT Metadata.",
    });
  }
};

module.exports = { getNFTMetadata };
