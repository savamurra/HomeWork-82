import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import {artistRouter} from "./routers/Artists";
import {albumRouter} from "./routers/Albums";
import {trackRouter} from "./routers/Tracks";
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

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