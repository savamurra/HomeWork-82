import express from "express";
import {ArtistWithoutId} from "../types";
import {Artist} from "../models/Artist";
import {imagesUpload} from "../multer";
import {Error} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Album} from "../models/Album";


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

artistRouter.post('/', imagesUpload.single('photo'), auth, permit('user', 'admin'), async (req, res, next) => {
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
        if (err instanceof Error.ValidationError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

artistRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    const user = expressReq.user;

    const id = req.params.id;

    try {
        const currentArtist = await Artist.findById(id);
        if (!currentArtist) {
            res.status(404).send({error: "Artist not found"});
            return;
        }

        if (user.role === 'admin') {
            const artist = await Artist.findByIdAndDelete(id);
            res.send({message: "Artist deleted successfully.", artist});
        } else if (user.role === 'user') {
            if (currentArtist) {
                if (currentArtist.user.toString() !== user._id.toString()) {
                    res.status(403).send({error: "You can not delete someone else's artist"});
                    return;
                } else if (currentArtist.isPublished === false) {
                    const artist = await Album.findByIdAndDelete(id);
                    res.send({message: "Artist deleted successfully.", artist});
                } else {
                    res.status(403).send({error: "You can't delete an artist if it's published."});
                    return;
                }
            }
        }
    } catch (e) {
        next(e);
    }
});