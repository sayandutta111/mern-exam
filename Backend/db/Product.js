const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  tweet: String,
});

module.exports = mongoose.model("products", productSchema);
