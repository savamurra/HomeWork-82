import express from "express";
import {TrackWithoutId} from "../types";
import {Track} from "../models/Track";
import {Album} from "../models/Album";
import {Artist} from "../models/Artist";


export const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    const album_id = req.query.album as string;

    try {
        if (album_id) {
            const result = await Track.find({album: album_id});
            if (!result) {
                res.status(404).send({error: "No such track found"});
            } else {
                res.send(result);
            }
        } else {
            const result = await Track.find();
            if (result.length === 0) {
                res.status(400).send('Tracks not found');
            } else {
                res.status(200).send(result);
            }
        }
    } catch (error) {
        next(error);
    }
});

trackRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const artist = await Artist.findById(id);
        if (!artist) {
            res.status(404).send({error: "Artist not found"});
            return
        }
        const albums = await Album.find({artist: artist});
        if (albums.length === 0) {
            res.status(404).send({error: "No albums found for this artist"});
            return
        }
        const tracks = await Track.find({album: albums});
        if (tracks.length === 0) {
            res.status(404).send({error: "No tracks found for these albums"});
            return
        }
        res.status(200).send(tracks);
    } catch (error) {
        next(error);
    }
});

trackRouter.post('/', async (req, res, next) => {
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