// 3. Decentralized Storage (IPFS Integration)

const TextStorageSchema = require("../models/textStorageModel.js");
const { getHelia } = require("../helpers/helia.js");

const storeText = async (req, res) => {
  const { str } = await getHelia();

  try {
    const { text } = req.body;

    const hash = await str.add(text);

    const textStorageData = await TextStorageSchema.create({
      hash,
      text,
    });

    const parsedText = await str.get(hash);

    console.log("parsed text", parsedText);

    res.status(200).json(textStorageData);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

const getText = async (req, res) => {
  try {
    const { hash } = req.params;

    const found = await TextStorageSchema.findOne({
      hash,
    });

    // const { str } = await getHelia();

    // The line below causes "MaxListenersExceededWarning" error
    // and I don't want to use process.setMaxListeners(0);
    // const cid = CID.parse(hash);
    // const text = await str.get(cid);

    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  storeText,
  getText,
};
