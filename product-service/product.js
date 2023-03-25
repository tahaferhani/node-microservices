const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    qty: Number
});

module.exports = mongoose.model("Product", productSchema);
