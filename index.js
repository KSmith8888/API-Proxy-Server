const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const weather = require("./routes/weather-route.js");
const nasa = require("./routes/nasa-route.js");

const app = express();

app.set("trust proxy", 1);

app.use(express.json());

app.use(
    cors({
        origin: process.env.ORIGIN,
        optionsSuccessStatus: 200,
    })
);

const limiter = rateLimit({
    windowMs: 60000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

app.get("/", (req, res) => {
    return res.json({ success: "This is not the data you're looking for" });
});

app.use("/weather", weather);
app.use("/nasa", nasa);

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`)
);
