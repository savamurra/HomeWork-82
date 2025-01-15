import mongoose from "mongoose";
import config from "./config";
import {Artist} from "./models/Artist";
import {Album} from "./models/Album";
import {Track} from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('user');
        await db.dropCollection('task');
    } catch (e) {
        console.error(e);
    }

    const artist = await Artist.create(
        {
            name: "Ed Sheeran",
            info: "He was born in 1974, in England",
            photo: 'fixtures/edSheeran.jpeg',
        },
        {
            name: "Michael Jackson",
            info: "The best hip hop artist of 90 year",
            photo: 'fixtures/michaelJackson.jpeg',
        }
    );

    const album = await Album.create(
        {
            title: "Sky falls",
            artist: artist[0]._id,
            releaseDate: 2005,
            image: 'fixtures/skyfall.jpeg',
        },
        {
            title: "Sky falls-2",
            artist: artist[0]._id,
            releaseDate: 2006,
            image: 'fixtures/skyfall2.jpeg',
        },
        {
            title: "Big mountain",
            artist: artist[1]._id,
            releaseDate: 2005,
            image: 'fixtures/mountain.jpeg',
        },
        {
            title: "Forest is deep",
            artist: artist[1]._id,
            releaseDate: 2005,
            image: 'fixtures/forest.jpeg',
        },
    );

    await Track.create(
        {
            title: 'Shadows of the Dawn',
            album: album[0]._id,
            duration: 3.54
        },
        {
            title: 'Echoes in the Mist',
            album: album[0]._id,
            duration: 3.54
        },
        {
            title: 'Broken Skylines',
            album: album[0]._id,
            duration: 3.54
        },
        {
            title: 'Whispers of the Sea',
            album: album[0]._id,
            duration: 3.54
        },
        {
            title: 'Dancing in the Chaos',
            album: album[0]._id,
            duration: 3.54
        },
        {
            title: 'Lost in the Universe',
            album: album[1]._id,
            duration: 3.54
        },
        {
            title: 'Fading Fireflies',
            album: album[1]._id,
            duration: 3.54
        },
        {
            title: 'Crimson Horizon',
            album: album[1]._id,
            duration: 3.54
        },
        {
            title: 'Dreamcatcher’s Lullaby',
            album: album[1]._id,
            duration: 3.54
        },
        {
            title: 'Moonlit Serenade',
            album: album[1]._id,
            duration: 3.54
        },
        {
            title: 'Voices of the Storm',
            album: album[2]._id,
            duration: 3.54
        },
        {
            title: 'Fragments of Time',
            album: album[2]._id,
            duration: 3.54
        },
        {
            title: 'Golden Ashes',
            album: album[2]._id,
            duration: 3.54
        },
        {
            title: 'Waves of Eternity',
            album: album[2]._id,
            duration: 3.54
        },
        {
            title: 'Frozen in Harmony',
            album: album[2]._id,
            duration: 3.54
        },
        {
            title: 'Beyond the Horizon',
            album: album[3]._id,
            duration: 3.54
        },
        {
            title: 'Chasing Starlight',
            album: album[3]._id,
            duration: 3.54
        },
        {
            title: 'Falling Feathers',
            album: album[3]._id,
            duration: 3.54
        },
        {
            title: 'Whispered Secrets',
            album: album[3]._id,
            duration: 3.54
        },
        {
            title: 'Under Neon Skies',
            album: album[3]._id,
            duration: 3.54
        },
    );

    await db.close();
};

run().catch(console.error);