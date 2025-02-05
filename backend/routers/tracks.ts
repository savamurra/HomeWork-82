import express from "express";
import { TrackWithoutId } from "../types";
import { Track } from "../models/Track";
import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import { Error } from "mongoose";
import auth, { RequestWithUser } from "../middleware/auth";
import permit from "../middleware/permit";
import TrackHistory from "../models/TrackHistory";

export const trackRouter = express.Router();

trackRouter.get("/", async (req, res, next) => {
  const album_id = req.query.album as string;

  try {
    if (album_id) {
      const result = await Track.find({ album: album_id }).sort({
        numberOfTracks: 1,
      });
      const album = await Album.findById(album_id);
      const artist = await Artist.findById(album?.artist);
      if (!result) {
        res.status(404).send({ error: "No such track found" });
      } else {
        res.send({ results: result, album: album, artist: artist });
      }
    } else {
      const result = await Track.find();
      if (result.length === 0) {
        res.status(400).send("Tracks not found");
      } else {
        res.status(200).send(result);
      }
    }
  } catch (error) {
    next(error);
  }
});

trackRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const artist = await Artist.findById(id);
    if (!artist) {
      res.status(404).send({ error: "Artist not found" });
      return;
    }
    const albums = await Album.find({ artist: artist });
    if (albums.length === 0) {
      res.status(404).send({ error: "No albums found for this artist" });
      return;
    }
    const tracks = await Track.find({ album: albums });
    if (tracks.length === 0) {
      res.status(404).send({ error: "No tracks found for these albums" });
      return;
    }
    res.status(200).send(tracks);
  } catch (error) {
    next(error);
  }
});

trackRouter.post("/", auth, permit("user", "admin"), async (req, res, next) => {
  const expressReq = req as RequestWithUser;

  const user = expressReq.user;

  if (!req.body.title) {
    res.status(400).send({ error: "Please enter a title" });
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
    numberOfTracks: req.body.numberOfTracks,
    youtubeLink: req.body.youtubeLink,
    user: user._id,
  };

  try {
    const track = new Track(newTrack);
    await track.save();
    res.send(track);
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      res.status(400).send(err);
      return;
    }
    next(err);
  }
});

trackRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    const id = req.params.id;
    try {
      const track = await Track.findOne({ _id: id });

      if (!track) {
        res.status(403).send({ error: "No track found with this id" });
      }

      const updateTrack = await Track.findOneAndUpdate(
        { _id: id },
        { isPublished: !track?.isPublished },
        { new: true },
      );

      res.send({ message: "isPublished updated successfully", updateTrack });
    } catch (e) {
      next(e);
    }
  },
);

trackRouter.delete(
  "/:id",
  auth,
  permit("admin", "user"),
  async (req, res, next) => {
    const expressReq = req as RequestWithUser;

    const user = expressReq.user;

    const id = req.params.id;

    try {
      const currentTrack = await Track.findById(id);
      if (!currentTrack) {
        res.status(404).send({ error: "Track not found" });
        return;
      }

      if (user.role === "admin") {
        const track = await Track.findByIdAndDelete(id);
        await TrackHistory.findOneAndDelete({ track: id });
        res.send({ message: "Track deleted successfully.", track });
      } else if (user.role === "user") {
        if (currentTrack) {
          if (currentTrack.user.toString() !== user._id.toString()) {
            res
              .status(403)
              .send({ error: "You can not delete someone else's track" });
            return;
          } else if (currentTrack.isPublished === false) {
            const track = await Track.findByIdAndDelete(id);
            await TrackHistory.findOneAndDelete({ track: id });
            res.send({ message: "Track deleted successfully.", track });
          } else {
            res
              .status(403)
              .send({ error: "You can't delete an track if it's published." });
            return;
          }
        }
      }
    } catch (e) {
      next(e);
    }
  },
);
