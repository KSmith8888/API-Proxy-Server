const express = require("express");
const sanitizeChars = require("./sanitize.js");

const weather = express.Router();
let weatherCache;
let cacheTime;

weather.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    const currentTime = Date.now();
    if (
        cacheTime &&
        currentTime - cacheTime < 500000 &&
        searchtext.toLowerCase() === weatherCache.name.toLowerCase()
    ) {
        return res.json(weatherCache);
    }
    if (sanitizeChars(searchtext)) {
        res.status(400);
        return res.json("Bad Request");
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchtext}&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
    try {
        const weatherResponse = await fetch(url);
        if (weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            weatherCache = weatherData;
            cacheTime = currentTime;
            weatherData.time = currentTime;
            return res.json(weatherData);
        } else {
            res.status(weatherResponse.status);
            throw new Error(weatherResponse.status);
        }
    } catch (err) {
        return res.json(err);
    }
});

module.exports = weather;
