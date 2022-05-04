const mongoose = require("mongoose");
const path = require("path");
const config = require(path.resolve(__dirname, "..") + "/config/db");

const itemSchema = new mongoose.Schema({
  content: String,
  authenticationCode: {
    type: Number,
    validate(value) {
      if (value < 1000 && value > 9999)
        throw new Error("Invalid authentication code");
    },
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: config.ttlDuration },
  },
});

module.exports = mongoose.model("item", itemSchema);
