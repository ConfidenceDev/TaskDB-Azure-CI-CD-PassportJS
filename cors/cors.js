const cors = require("cors");
const { PORT } = require("../configs/config");

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
