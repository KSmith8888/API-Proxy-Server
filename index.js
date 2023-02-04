import dotenv from "dotenv";
dotenv.config();
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { weather } from "./routes/weather-route.js";
import { nasa } from "./routes/nasa-route.js";

const app = express();

app.set("trust proxy", 1);

app.use(express.json());

app.use(cors());

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
