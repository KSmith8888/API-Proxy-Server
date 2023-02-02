import express from "express";
const weather = express.Router();
import fetch from "node-fetch";
import { sanitizeChars } from "./sanitize.js";

const fetchWeather = async (searchtext) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = await weatherStream.json();
        return weatherJson;
    } catch (err) {
        return { Error: err };
    }
};

weather.get("/", (req, res) => {
    return res.json({ success: "Hello Weather" });
});

weather.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    if (!sanitizeChars(searchtext)) {
        const data = await fetchWeather(searchtext);
        return res.json(data);
    } else {
        return res.json({
            Error: "please do not include special characters in your request",
        });
    }
});

weather.post("/", async (req, res) => {
    const searchtext = req.body.searchtext;
    console.log(req);
    //const data = await fetchWeather(searchtext);
    //return res.json(data);
});

export { weather };
