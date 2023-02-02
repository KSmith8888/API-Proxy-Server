import express from "express";
const nasa = express.Router();
import fetch from "node-fetch";

const fetchNasaData = async () => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    try {
        const nasaStream = await fetch(url);
        const nasaJson = await nasaStream.json();
        return nasaJson;
    } catch (err) {
        return { Error: err };
    }
};

nasa.get("/", async (req, res) => {
    const data = await fetchNasaData();
    res.json(data);
});

export { nasa };
