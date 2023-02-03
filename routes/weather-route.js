import express from "express";
import { sanitizeChars } from "./sanitize.js";

const weather = express.Router();
let weatherCache;
let cacheTime;

weather.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    const currentTime = Date.now();
    try {
        if (sanitizeChars(searchtext)) {
            throw new Error(
                "please do not include special characters in your request"
            );
        }
        if (cacheTime && currentTime - cacheTime < 5000) {
            throw new Error(
                "Please wait at least five seconds before requesting information for another city"
            );
        }
    } catch (err) {
        return res.json(`Error: ${err}`);
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
            throw new Error(weatherResponse.status);
        }
    } catch (err) {
        return res.json(`Error: ${err}`);
    }
});

weather.post("/", async (req, res) => {
    const searchtext = req.body.searchtext;
    console.log(req);
    //const data = await fetchWeather(searchtext);
    //return res.json(data);
});

export { weather };
