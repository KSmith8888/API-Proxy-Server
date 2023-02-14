import express from "express";
import { sanitizeChars } from "./sanitize.js";

const movieDetails = express.Router();

movieDetails.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    if (sanitizeChars(movieId)) {
        res.status(400);
        return res.json("Bad Request");
    }
    const url = `http://www.omdbapi.com/?i=${movieId}&type=movie&apikey=${process.env.MOVIES_API_KEY}`;
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

export { movieDetails };
