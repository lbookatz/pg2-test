const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();

require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL, {
    dialiectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

app.get("/", async(req, res) => {
    console.log("Got here!");
    res.status(200).json({"status": "ok"});
});

const server = app.listen(process.env.PORT || 5000, async() => {
    db.authenticate();
    console.log("App is online");
});

const shutdown = () => {
    server.close(async() => {
        console.log("App is now offline.");
        await db.close();
    });
};

process.on("SIGTERM", () => {
    console.log("SIGTERM");
    shutdown();
});

process.on("SIGINT", () => {
    console.log("SIGINT");
    shutdown();
});
