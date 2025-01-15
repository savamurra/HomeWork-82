import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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
    image: String,
})

export const Album = mongoose.model('Album', AlbumSchema);

export default AlbumSchema;