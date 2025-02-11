const express = require("express");
const router = express.Router();
const urlController = require("./controller")();

const urlRoutes = () => {
  router.post("/", urlController.generateShortUrlController);
  router.get("/:shortId", urlController.getRedirectionUrlFromUUIDController);
  router.get(
    "/analytics/:shortId",
    urlController.getAnalyticsFromUUIDController,
  );
  return router;
};

module.exports = urlRoutes;
