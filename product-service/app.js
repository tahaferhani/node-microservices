const express = require("express");
const mongoose = require("mongoose");
const amqplib = require("amqplib");
const Product = require("./product");

mongoose.connect("mongodb://localhost:27017/product-service");

const app = express();
app.use(express.json());

const connect = async () => {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return channel;
};

connect().then(channel => {
    channel.consume("order-created", async message => {
        const order = JSON.parse(message.content.toString());
        await Product.findByIdAndUpdate(order.product, { $inc: { qty: -order.qty } });
    });
});

app.listen(4000, () => {
    console.log("Listening on port 4000");
});
