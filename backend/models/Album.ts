import mongoose from 'mongoose';
import {IAlbum} from "../types";


const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: async (value: string): Promise<boolean> => {
                    const album: IAlbum | null = await Album.findOne({title: value});
                    return !album;
                },
                message: "Album title must be unique"
            },
        ]
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is required'],
    },
    releaseDate: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    trackCount: Number,
    isPublished: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export const Album = mongoose.model('Album', AlbumSchema);

export default AlbumSchema;