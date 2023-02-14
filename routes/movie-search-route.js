import express from "express";
import { sanitizeChars } from "./sanitize.js";

const movieSearch = express.Router();

movieSearch.get("/:searchtext", async (req, res) => {
    const searchtext = req.params.searchtext;
    if (sanitizeChars(searchtext)) {
        res.status(400);
        return res.json("Bad Request");
    }
    const url = `http://www.omdbapi.com/?s=${searchtext}&type=movie&apikey=${process.env.MOVIES_API_KEY}`;
    try {
        const moviesResponse = await fetch(url);
        if (moviesResponse.ok) {
            const moviesData = await moviesResponse.json();
            return res.json(moviesData);
        } else {
            res.status(moviesResponse.status);
            throw new Error(moviesResponse.status);
        }
    } catch (err) {
        return res.json(err);
    }
});

export { movieSearch };
