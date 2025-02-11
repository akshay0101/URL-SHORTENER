const urlService = () => {
  const urlUtil = require("./utils")();
  return {
    generateShortUrlService: async function (url) {
      const shortId = await urlUtil.generateUUID(8);
      const newUrlObj = await urlUtil.createShortUrl({
        shortId: shortId,
        redirectUrl: url,
        clickHistory: [],
      });
      return newUrlObj;
    },
    getRedirectionUrlFromUUIDService: async function (shortId) {
      const urlObject = await urlUtil.updateShortUrl(
        { shortId: shortId },
        { $push: { clickHistory: { timestamps: Date.now() } } },
      );
      return urlObject.redirectUrl;
    },
    getAnalyticsFromUUIDService: async function (shortId) {
      const urlObject = await urlUtil.getShortUrl(
        { shortId: shortId },
        { clickHistory: 1 },
      );
      let responseToSend = [];
      console.log(urlObject);
      if (urlObject) {
        const clickHistory = urlObject.clickHistory;
        for (let data of clickHistory) {
          responseToSend.push({
            time: new Date(data.timestamps),
          });
        }
      }
      return responseToSend;
    },
  };
};

module.exports = urlService;
