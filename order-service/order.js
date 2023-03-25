const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    qty: Number,
    total: Number
});

module.exports = mongoose.model("Order", orderSchema);
