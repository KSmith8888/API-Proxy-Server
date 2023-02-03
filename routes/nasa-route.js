import express from "express";

const nasa = express.Router();
let nasaCache;
let cacheTime;

nasa.get("/", async (req, res) => {
    const currentTime = Date.now();
    try {
        if (cacheTime && currentTime - cacheTime < 60000) {
            throw new Error(
                "Please wait at least one minute before requesting information again"
            );
        }
    } catch (err) {
        return res.json(`Error: ${err}`);
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
            throw new Error(nasaResponse.status);
        }
    } catch (err) {
        return res.json(`Error: ${err}`);
    }
});

export { nasa };
