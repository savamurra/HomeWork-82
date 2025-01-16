import express from "express";
import {AlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";
import {Album} from "../models/Album";
import {Artist} from "../models/Artist";
import {Error} from "mongoose";
import {Track} from "../models/Track";


export const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    const artist_id = req.query.artist as string;
    try {
        if (artist_id) {
            const result = await Album.find({ artist: artist_id }).sort({ releaseDate: - 1 });

            const albumsTracker = []

            for (const album of result) {
                const trackCount = await Track.countDocuments({ album: album._id });
                albumsTracker.push({
                    ...album.toObject(),
                    trackCount: trackCount
                });
            }
            const artist = await Artist.findById(artist_id);
            if (!result) {
                res.status(404).send({error: "No such artist found"});
            } else {
                res.send({results: albumsTracker, artist: artist});
            }
        } else {
            const result = await Album.find();
            if (result.length === 0) {
                res.status(400).send('Albums not found');
            } else {
                res.status(200).send(result);
            }
        }

    } catch (error) {
        next(error);
    }
});

albumRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await Album.findById({_id: id});
        if (!result) {
            res.status(400).send('Albums not found');
        } else {
            const artist = await Artist.findById({_id: result.artist})
            res.status(200).send([result, artist]);
        }
    } catch (error) {
        next(error);
    }
});

albumRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    if (!req.body.title || !req.body.releaseDate) {
        res.status(400).send({"error": "Please enter a name, albumId and releaseDate"});
        return;
    }

    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) res.status(400).send("Not found artist");
    }

    const newAlbum  = {
        title: req.body.title,
        artist: req.body.artist,
        releaseDate: req.body.releaseDate,
        image: req.file ? 'images' + req.file.filename : null,
    }

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (err) {
        if (err instanceof Error.ValidationError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});