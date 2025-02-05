import express from "express";
import TrackHistory from "../models/TrackHistory";
import { Track } from "../models/Track";
import auth, { RequestWithUser } from "../middleware/auth";
import { Album } from "../models/Album";
import { Error } from "mongoose";

const trackHistory = express.Router();

trackHistory.post("/", auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const trackId = req.body.track;

    const existingHistory = await TrackHistory.findOne({ track: trackId });

    if (existingHistory) {
      existingHistory.datetime = new Date().toISOString();
      existingHistory.save();
      res.status(200).send(existingHistory);
      return;
    }

    if (!trackId) {
      res.status(400).send({ error: "Track ID is required" });
      return;
    }

    const track = await Track.findById(trackId).populate("album");
    if (!track || !track.album) {
      res.status(404).send({ error: "Track or album not found" });
      return;
    }

    const album = await Album.findById(track.album).populate("artist");
    if (!album || !album.artist) {
      res.status(404).send({ error: "Artist not found" });
      return;
    }

    const newTrackHistory = new TrackHistory({
      user: user._id,
      track: track._id,
      artist: album.artist._id,
    });

    await newTrackHistory.save();
    res.send({
      message: "Track added to history",
      trackHistory: newTrackHistory,
    });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

trackHistory.get("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const history = await TrackHistory.find({ user: user._id })
      .sort({ datetime: -1 })
      .populate("track", "title")
      .populate("artist", "name photo");

    if (history.length === 0) {
      res.status(400).send("Track history not found");
    } else {
      res.status(200).send(history);
    }
  } catch (e) {
    next(e);
  }
});

export default trackHistory;
