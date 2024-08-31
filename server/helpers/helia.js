const getHelia = async () => {
  const { createHelia } = await import("helia");
  const { strings } = await import("@helia/strings");
  const { CID } = await import("multiformats/cid");
  const helia = await createHelia();
  const str = strings(helia);

  return {
    CID,
    str,
  };
};

module.exports = {
  getHelia,
};
