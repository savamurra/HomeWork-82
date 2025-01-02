import express from "express";
import {TrackWithoutId} from "../types";
import {Track} from "../models/Track";
import {Album} from "../models/Album";


export const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const result = await Track.find();
        if (result.length === 0) {
            res.status(400).send('Tracks not found');
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        next(error);
    }
});

trackRouter.post('/',  async (req, res, next) => {
    if (!req.body.title) {
        res.status(400).send({"error": "Please enter a title"});
        return;
    }

    if (req.body.album) {
        const album = await Album.findById(req.body.album);
        if (!album) res.status(400).send("Not found album");
    }

    const newTrack: TrackWithoutId = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration,
    }

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (err) {
        next(err);
    }
});