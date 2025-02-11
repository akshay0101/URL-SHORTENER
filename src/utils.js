const urlUtils = () => {
  const urlModel = require("../models/url");
  const nanoid = require("nanoid");
  return {
    generateUUID: async function (length) {
      const randomUUID = nanoid.customAlphabet(
        "1234567890ABCDEFGHIJKLMNOPQRSTUVWZYZ",
        length,
      )();
      return randomUUID;
    },
    createShortUrl: async function (data) {
      return await urlModel.create(data);
    },
    updateShortUrl: async function (filter, updationObj) {
      return await urlModel
        .findOneAndUpdate(filter, updationObj, { new: true })
        .lean();
    },
    getShortUrl: async function (filter, projection = {}) {
      return await urlModel.findOne(filter, projection).lean();
    },
  };
};
module.exports = urlUtils;
