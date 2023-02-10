import express from "express";
import { sanitizeChars } from "./sanitize.js";

const movies = express.Router();

movies.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    const currentTime = Date.now();
    if (sanitizeChars(searchtext)) {
        res.status(400);
        return res.json("Bad Request");
    }
    const url = `http://www.omdbapi.com/?s=${searchtext}&apikey=${process.env.MOVIES_API_KEY}`;
    try {
        const moviesResponse = await fetch(url);
        if (moviesResponse.ok) {
            const moviesData = await moviesResponse.json();
            moviesData.time = currentTime;
            return res.json(moviesData);
        } else {
            res.status(moviesResponse.status);
            throw new Error(moviesResponse.status);
        }
    } catch (err) {
        return res.json(err);
    }
});

export { movies };
