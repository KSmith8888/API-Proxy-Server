const express = require("express");

const nasa = express.Router();
let nasaCache;
let cacheTime;

nasa.get("/", async (req, res) => {
    const currentTime = Date.now();
    if (nasaCache && cacheTime && currentTime - cacheTime < 180000) {
        return res.json(nasaCache);
    }
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    try {
        const nasaResponse = await fetch(url);
        if (nasaResponse.ok) {
            const nasaData = await nasaResponse.json();
            nasaCache = nasaData;
            cacheTime = currentTime;
            return res.json(nasaData);
        } else {
            res.status(nasaResponse.status);
            throw new Error(nasaResponse.status);
        }
    } catch (err) {
        return res.json(err);
    }
});

module.exports = nasa;
