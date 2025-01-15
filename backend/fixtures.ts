import mongoose from "mongoose";
import config from "./config";
import {Artist} from "./models/Artist";
import {Album} from "./models/Album";
import {Track} from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
    } catch (e) {
        console.error(e);
    }

    const artist = await Artist.create(
        {
            name: "Ed Sheeran",
            info: "He was born in 1974, in England",
            photo: "fixtures/edSheeran.jpg",
        },
        {
            name: "Michael Jackson",
            info: "The best hip hop artist of 90 year",
            photo: "fixtures/michaelJackson.jpg",
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
            duration: 3.54,
            numberOfTracks: 1,
        },
        {
            title: 'Echoes in the Mist',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 2,
        },
        {
            title: 'Broken Skylines',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 3,
        },
        {
            title: 'Whispers of the Sea',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 4,
        },
        {
            title: 'Dancing in the Chaos',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 5,
        },
        {
            title: 'Lost in the Universe',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 6,
        },
        {
            title: 'Fading Fireflies',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 7,
        },
        {
            title: 'Crimson Horizon',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 8,
        },
        {
            title: 'Dreamcatcher’s Lullaby',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 9,
        },
        {
            title: 'Moonlit Serenade',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 10,
        },
        {
            title: 'Voices of the Storm',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 11,
        },
        {
            title: 'Fragments of Time',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 12,
        },
        {
            title: 'Golden Ashes',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 13,
        },
        {
            title: 'Waves of Eternity',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 14,
        },
        {
            title: 'Frozen in Harmony',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 15,
        },
        {
            title: 'Beyond the Horizon',
            album: album[3]._id,
            duration: 3.54,
            numberOfTracks: 16,
        },
        {
            title: 'Chasing Starlight',
            album: album[3]._id,
            duration: 3.51,
            numberOfTracks: 17,
        },
        {
            title: 'Falling Feathers',
            album: album[3]._id,
            duration: 3.53,
            numberOfTracks: 18,
        },
        {
            title: 'Whispered Secrets',
            album: album[3]._id,
            duration: 3.55,
            numberOfTracks: 19,
        },
        {
            title: 'Under Neon Skies',
            album: album[3]._id,
            duration: 3.213,
            numberOfTracks: 20,
        },
    );

    await db.close();
};

run().catch(console.error);