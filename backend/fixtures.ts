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
            title: "Jujutsu Kaisen",
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
            youtubeLink: "https://www.youtube.com/watch?v=jkZnFdu6PXU",
        },
        {
            title: 'Echoes in the Mist',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 2,
            youtubeLink: "https://www.youtube.com/watch?v=lcn4lwF_H90",
        },
        {
            title: 'We dont talk anymore',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 3,
            youtubeLink: "https://www.youtube.com/watch?v=3AtDnEC4zak",
        },
        {
            title: 'Whispers of the Sea',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 4,
            youtubeLink: "https://www.youtube.com/watch?v=nfs8NYg7yQM",
        },
        {
            title: 'Dancing in the Chaos',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 5,
            youtubeLink: "https://www.youtube.com/watch?v=Mx92lTYxrJQ",
        },
        {
            title: 'Lost in the Universe',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 6,
            youtubeLink: "https://www.youtube.com/watch?v=kPa7bsKwL-c",
        },
        {
            title: 'Fading Fireflies',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 7,
            youtubeLink: "https://www.youtube.com/watch?v=izGwDsrQ1eQ",
        },
        {
            title: 'Crimson Horizon',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 8,
            youtubeLink: "https://www.youtube.com/watch?v=ZhIsAZO5gl0",
        },
        {
            title: 'Dreamcatcher’s Lullaby',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 9,
            youtubeLink: "https://www.youtube.com/watch?v=eAojIPsD0o4",
        },
        {
            title: 'Moonlit Serenade',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 10,
            youtubeLink: "https://www.youtube.com/watch?v=_VHsu82IkeU",
        },
        {
            title: 'Voices of the Storm',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 11,
            youtubeLink: "https://www.youtube.com/watch?v=i_yLpCLMaKk",
        },
        {
            title: 'Fragments of Time',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 12,
            youtubeLink: "https://www.youtube.com/watch?v=lY2yjAdbvdQ",
        },
        {
            title: 'Golden Ashes',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 13,
            youtubeLink: "https://www.youtube.com/watch?v=9Jh5R4119Nk",
        },
        {
            title: 'Waves of Eternity',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 14,
            youtubeLink: "https://www.youtube.com/watch?v=czzncDnsGJE",
        },
        {
            title: 'Frozen in Harmony',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 15,
            youtubeLink: "https://www.youtube.com/watch?v=takHmIklbkk",
        },
        {
            title: 'Beyond the Horizon',
            album: album[3]._id,
            duration: 3.54,
            numberOfTracks: 16,
            youtubeLink: "https://www.youtube.com/watch?v=yzFx-JM34MY",
        },
        {
            title: 'Chasing Starlight',
            album: album[3]._id,
            duration: 3.51,
            numberOfTracks: 17,
            youtubeLink: "https://www.youtube.com/watch?v=hdO9cc7WOyE",
        },
        {
            title: 'Falling Feathers',
            album: album[3]._id,
            duration: 3.53,
            numberOfTracks: 18,
            youtubeLink: "https://www.youtube.com/watch?v=sBZFQ-gX_Yk",
        },
        {
            title: 'Whispered Secrets',
            album: album[3]._id,
            duration: 3.55,
            numberOfTracks: 19,
            youtubeLink: "https://www.youtube.com/watch?v=j3E_YLpCfv8",
        },
        {
            title: 'Under Neon Skies',
            album: album[3]._id,
            duration: 3.213,
            numberOfTracks: 20,
            youtubeLink: "https://www.youtube.com/watch?v=w1FsS1kwYI0",
        },
    );

    await db.close();
};

run().catch(console.error);