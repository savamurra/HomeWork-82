import express from "express";
import { imagesUpload } from "../multer";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import { Error } from "mongoose";
import { Track } from "../models/Track";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";

export const albumRouter = express.Router();

albumRouter.get("/", async (req, res, next) => {
  const artist_id = req.query.artist as string;
  try {
    if (artist_id) {
      const result = await Album.find({ artist: artist_id }).sort({
        releaseDate: -1,
      });

      const albumsTracker = [];

      for (const album of result) {
        const trackCount = await Track.countDocuments({ album: album._id });
        albumsTracker.push({
          ...album.toObject(),
          trackCount: trackCount,
        });
      }
      const artist = await Artist.findById(artist_id);
      if (!result) {
        res.status(404).send({ error: "No such artist found" });
      } else {
        res.send({ results: albumsTracker, artist: artist });
      }
    } else {
      const result = await Album.find();
      if (result.length === 0) {
        res.status(400).send("Albums not found");
      } else {
        res.status(200).send(result);
      }
    }
  } catch (error) {
    next(error);
  }
});

albumRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Album.findById({ _id: id });
    if (!result) {
      res.status(400).send("Albums not found");
    } else {
      const artist = await Artist.findById({ _id: result.artist });
      res.status(200).send([result, artist]);
    }
  } catch (error) {
    next(error);
  }
});

albumRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const album = await Album.findOne({ _id: id });

      if (!album) {
        res.status(403).send({ error: "No album found with this id" });
      }

      const updateAlbum = await Album.findOneAndUpdate(
        { _id: id },
        { isPublished: !album?.isPublished },
        { new: true },
      );

      res.send({ message: "isPublished updated successfully", updateAlbum });
    } catch (e) {
      next(e);
    }
  },
);

albumRouter.post(
  "/",
  imagesUpload.single("image"),
  auth,
  permit("user", "admin"),
  async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    const user = expressReq.user;

    if (!req.body.title || !req.body.releaseDate) {
      res
        .status(400)
        .send({ error: "Please enter a name, albumId and releaseDate" });
      return;
    }

    if (req.body.artist) {
      const artist = await Artist.findById(req.body.artist);
      if (!artist) res.status(400).send("Not found artist");
    }

    const newAlbum = {
      title: req.body.title,
      artist: req.body.artist,
      releaseDate: req.body.releaseDate,
      image: req.file ? "images" + req.file.filename : null,
      user: user._id,
    };

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
  },
);

albumRouter.delete(
  "/:id",
  auth,
  permit("admin", "user"),
  async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    const user = expressReq.user;

    const id = req.params.id;

    try {
      const currentAlbum = await Album.findById(id);
      if (!currentAlbum) {
        res.status(404).send({ error: "Albums not found" });
        return;
      }

      if (user.role === "admin") {
        const album = await Album.findByIdAndDelete(id);
        res.send({ message: "Album deleted successfully.", album });
      } else if (user.role === "user") {
        if (currentAlbum) {
          if (currentAlbum.user.toString() !== user._id.toString()) {
            res
              .status(403)
              .send({ error: "You can not delete someone else's album" });
            return;
          } else if (currentAlbum.isPublished === false) {
            const album = await Album.findByIdAndDelete(id);
            res.send({ message: "Album deleted successfully.", album });
          } else {
            res
              .status(403)
              .send({ error: "You can't delete an album if it's published." });
            return;
          }
        }
      }
    } catch (e) {
      next(e);
    }
  },
);
