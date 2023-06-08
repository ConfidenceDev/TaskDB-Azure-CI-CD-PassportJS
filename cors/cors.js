const cors = require("cors");
const { PORT } = require("../configs/config");

/*
  Set cors to allow browser access from permitted url only
  origin: "*" - For all urls
*/
const corsHeader = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "X-Requested-With",
    "X-Access-Token",
    "Content-Type",
    "Host",
    "Accept",
    "Connection",
    "Cache-Control",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors(corsHeader);
