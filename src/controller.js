const urlController = () => {
  const urlService = require("./service")();
  return {
    generateShortUrlController: async function (req, res) {
      try {
        const url = req.body.url;
        if (!url) throw new Error("url is required!!!");
        const data = await urlService.generateShortUrlService(url);
        return res.status(200).json({ data });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          msg: e.message,
        });
      }
    },
    getRedirectionUrlFromUUIDController: async function (req, res) {
      try {
        let shortId = req.params.shortId;
        if (!shortId) throw new Error("UUID is required!!!");
        const data = await urlService.getRedirectionUrlFromUUIDService(shortId);
        return res.status(200).json(data);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          msg: e.message,
        });
      }
    },
    getAnalyticsFromUUIDController: async function (req, res) {
      try {
        let shortId = req.params.shortId;
        if (!shortId) throw new Error("UUID is required!!!");
        let data = await urlService.getAnalyticsFromUUIDService(shortId);
        return res.status(200).json(data);
      } catch (e) {
        return res.status(400).json({
          msg: e.message,
        });
      }
    },
  };
};

module.exports = urlController;
