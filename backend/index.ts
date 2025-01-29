import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import {artistRouter} from "./routers/artists";
import {albumRouter} from "./routers/albums";
import {trackRouter} from "./routers/tracks";
import userRouter from "./routers/users";
import trackHistory from "./routers/trackHistories";
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistory);

const run = async () => {
    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));