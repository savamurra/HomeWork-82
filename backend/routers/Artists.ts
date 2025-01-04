import express from "express";
import {ArtistWithoutId} from "../types";
import {Artist} from "../models/Artist";
import {imagesUpload} from "../multer";

export const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const result = await Artist.find();
        if (result.length === 0) {
            res.status(400).send('Artists not found');
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        next(error);
    }
});

artistRouter.post('/', imagesUpload.single('photo'),async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({"error": "Please enter a name"});
        return;
    }

    const newArtist: ArtistWithoutId = {
        name: req.body.name,
        photo: req.file ? 'images' + req.file.filename : null,
        info: req.body.info,
    }

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch (err) {
        next(err);
    }
});