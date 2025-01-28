import mongoose from "mongoose";
import config from "./config";
import {Artist} from "./models/Artist";
import {Album} from "./models/Album";
import {Track} from "./models/Track";
import Users from "./routers/users";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
        await db.dropCollection('users')
    } catch (e) {
        console.error(e);
    }

    const [firstUser, secondUser,thirdUser] = await User.create(
        {
            username: 'Sanzhar',
            password: '123',
            token: randomUUID(),
            role: 'admin',
        },
        {
            username: 'Sadyr',
            password: '123',
            token: randomUUID(),
            role: 'user',
        },
        {
            username: 'Kamchy',
            password: '123',
            token: randomUUID(),
            role: 'user',
        }
    );

    const [firstArtist, secondArtist,thirdArtist] = await Artist.create(
        {
            name: "Ed Sheeran",
            info: "He was born in 1974, in England",
            photo: "fixtures/edSheeran.jpg",
            user: firstUser._id
        },
        {
            name: "Michael Jackson",
            info: "The best hip hop artist of 90 year",
            photo: "fixtures/michaelJackson.jpg",
            user: secondUser._id
        },
        {
            name: "Alan Walker",
            info: "The best hip hop artist",
            photo: "fixtures/michaelJackson.jpg",
            user: thirdUser._id
        }
    );

    const album = await Album.create(
        {
            title: "Sky falls",
            artist: firstArtist._id,
            releaseDate: 2005,
            image: 'fixtures/skyfall.jpeg',
            user: firstUser._id,
        },
        {
            title: "Jujutsu Kaisen",
            artist: firstArtist._id,
            releaseDate: 2006,
            image: 'fixtures/skyfall2.jpeg',
            user: firstUser._id,
        },
        {
            title: "Big mountain",
            artist: secondArtist._id,
            releaseDate: 2005,
            image: 'fixtures/mountain.jpeg',
            user: secondUser._id,
        },
        {
            title: "Forest is deep",
            artist: thirdArtist._id,
            releaseDate: 2005,
            image: 'fixtures/forest.jpeg',
            user: thirdUser._id,
        },
    );

    await Track.create(
        {
            title: 'Shadows of the Dawn',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 1,
            youtubeLink: "https://www.youtube.com/watch?v=jkZnFdu6PXU",
            user: firstUser._id,
        },
        {
            title: 'Echoes in the Mist',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 2,
            youtubeLink: "https://www.youtube.com/watch?v=lcn4lwF_H90",
            user: firstUser._id,
        },
        {
            title: 'We dont talk anymore',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 3,
            youtubeLink: "https://www.youtube.com/watch?v=3AtDnEC4zak",
            user: firstUser._id,
        },
        {
            title: 'Whispers of the Sea',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 4,
            youtubeLink: "https://www.youtube.com/watch?v=nfs8NYg7yQM",
            user: firstUser._id,
        },
        {
            title: 'Dancing in the Chaos',
            album: album[0]._id,
            duration: 3.54,
            numberOfTracks: 5,
            youtubeLink: "https://www.youtube.com/watch?v=Mx92lTYxrJQ",
            user: firstUser._id,
        },
        {
            title: 'Lost in the Universe',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 6,
            youtubeLink: "https://www.youtube.com/watch?v=kPa7bsKwL-c",
            user: firstUser._id,
        },
        {
            title: 'Fading Fireflies',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 7,
            youtubeLink: "https://www.youtube.com/watch?v=izGwDsrQ1eQ",
            user: firstUser._id,
        },
        {
            title: 'Crimson Horizon',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 8,
            youtubeLink: "https://www.youtube.com/watch?v=ZhIsAZO5gl0",
            user: firstUser._id,
        },
        {
            title: 'Dreamcatcher’s Lullaby',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 9,
            youtubeLink: "https://www.youtube.com/watch?v=eAojIPsD0o4",
            user: firstUser._id,
        },
        {
            title: 'Moonlit Serenade',
            album: album[1]._id,
            duration: 3.54,
            numberOfTracks: 10,
            youtubeLink: "https://www.youtube.com/watch?v=_VHsu82IkeU",
            user: firstUser._id,
        },
        {
            title: 'Voices of the Storm',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 11,
            youtubeLink: "https://www.youtube.com/watch?v=i_yLpCLMaKk",
            user: secondUser._id,
        },
        {
            title: 'Fragments of Time',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 12,
            youtubeLink: "https://www.youtube.com/watch?v=lY2yjAdbvdQ",
            user: secondUser._id,
        },
        {
            title: 'Golden Ashes',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 13,
            youtubeLink: "https://www.youtube.com/watch?v=9Jh5R4119Nk",
            user: secondUser._id,
        },
        {
            title: 'Waves of Eternity',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 14,
            youtubeLink: "https://www.youtube.com/watch?v=czzncDnsGJE",
            user: secondUser._id,
        },
        {
            title: 'Frozen in Harmony',
            album: album[2]._id,
            duration: 3.54,
            numberOfTracks: 15,
            youtubeLink: "https://www.youtube.com/watch?v=takHmIklbkk",
            user: secondUser._id,
        },
        {
            title: 'Beyond the Horizon',
            album: album[3]._id,
            duration: 3.54,
            numberOfTracks: 16,
            youtubeLink: "https://www.youtube.com/watch?v=yzFx-JM34MY",
            user: thirdUser._id,
        },
        {
            title: 'Chasing Starlight',
            album: album[3]._id,
            duration: 3.51,
            numberOfTracks: 17,
            youtubeLink: "https://www.youtube.com/watch?v=hdO9cc7WOyE",
            user: thirdUser._id,
        },
        {
            title: 'Falling Feathers',
            album: album[3]._id,
            duration: 3.53,
            numberOfTracks: 18,
            youtubeLink: "https://www.youtube.com/watch?v=sBZFQ-gX_Yk",
            user: thirdUser._id,
        },
        {
            title: 'Whispered Secrets',
            album: album[3]._id,
            duration: 3.55,
            numberOfTracks: 19,
            youtubeLink: "https://www.youtube.com/watch?v=j3E_YLpCfv8",
            user: thirdUser._id,
        },
        {
            title: 'Under Neon Skies',
            album: album[3]._id,
            duration: 3.213,
            numberOfTracks: 20,
            youtubeLink: "https://www.youtube.com/watch?v=w1FsS1kwYI0",
            user: thirdUser._id,
        },
    );

    await db.close();
};

run().catch(console.error);