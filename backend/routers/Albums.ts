import express from "express";
import {AlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";
import {Album} from "../models/Album";


export const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    try {
        const result = await Album.find();
        if (result.length === 0) {
            res.status(400).send('Albums not found');
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        next(error);
    }
});

albumRouter.post('/', imagesUpload.single('image'),async (req, res, next) => {
    if (!req.body.title || !req.body.artistId || !req.body.releaseDate) {
        res.status(400).send({"error": "Please enter a name, albumId and releaseDate"});
        return;
    }

    const newAlbum: AlbumWithoutId  = {
        title: req.body.title,
        artistId: req.body.artistId,
        releaseDate: req.body.releaseDate,
        image: req.file ? 'images' + req.file.filename : null,
    }

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (err) {
        next(err);
    }
});