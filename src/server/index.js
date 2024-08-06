const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const { Suprsend } = require("@suprsend/node-sdk");
const { Event } = require("@suprsend/node-sdk");

const supr_client = new Suprsend(
    process.env.SUPRSEND_WORKSPACE_KEY,
    process.env.SUPRSEND_WORKSPACE_SECRET
);

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/", (req, res) => {
    res.send("Express is running");
});

app.post("/send-notification", async (req, res) => {
    const distinct_id = "nexus";
    const event_name = "MY FIRST NOTIFICATION";

    const properties = {
        first_name: req.body.firstName,
        second_name: req.body.lastName,
        message: req.body.message,
        subtext: req.body.subtext,
    };

    const event = new Event(distinct_id, event_name, properties);

    await supr_client.track_event(event).then((res) => {
        console.log("response", res);
    });

    res.status(200).send("Notification sent successfully");
});

app.listen(4000, () => {
    console.log("Server listening on port 4000");
});