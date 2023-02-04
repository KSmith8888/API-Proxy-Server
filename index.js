import { config } from 'dotenv';
config();
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { weather } from "./routes/weather-route.js";
import { nasa } from "./routes/nasa-route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(express.json());

app.use(cors({
        origin: process.env.ORIGIN,
        optionsSuccessStatus: 200,
    }));

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

app.listen(PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`)
);
