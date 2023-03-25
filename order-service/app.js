const express = require("express");
const mongoose = require("mongoose");
const Order = require("./order");
const amqplib = require("amqplib");

mongoose.connect("mongodb://localhost:27017/order-service");

const connect = async () => {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("order-created");
    return channel;
};

const app = express();
app.use(express.json());

app.post("/order", async (req, res) => {
    const order = new Order(req.body);
    await order.save();

    const channel = await connect();
    channel.sendToQueue("order-created", Buffer.from(JSON.stringify(order)));

    res.send({
        success: true,
        message: "Order created successfully"
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
