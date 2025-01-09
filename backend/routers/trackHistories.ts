import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {TrackHistoryFields} from "../types";
import {Track} from "../models/Track";

const trackHistory = express.Router();

trackHistory.post('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({error: "No token present"});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: "Wrong token"});
        return;
    }

    try {
        const trackId = await Track.findById(req.body.track);
        if (!trackId) {
            res.status(401).send({error: "Track does not exist"});
            return;
        }
        const newTrackHistory = {
            user: user._id.toString(),
            track: trackId._id.toString(),
        }

        const trackHistory = new TrackHistory(newTrackHistory);
        await trackHistory.save();
        res.send({trackHistory, user: user.username});
    } catch (e) {
        next(e);
    }

});

export default trackHistory;