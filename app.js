const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { connectToMongoDB } = require("../url-shortner/connect");
const port = 4001;
const { MONGO_URL } = process.env;
connectToMongoDB(MONGO_URL ?? "mongodb://127.0.0.1:27017/url-shortner").then(
  // todo : fix this and read from env
  () => {
    console.log(`✅connected to mongo-database✅`);
  },
);
const urlRoutes = require("./src/routes")();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/url", urlRoutes);

app.listen(port, () => {
  console.log(`✅✅app started on port ${port}✅✅`);
});
