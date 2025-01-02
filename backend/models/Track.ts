import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: String,
        required: true,
    }
})

export const Track = mongoose.model('Track', TrackSchema);

export default TrackSchema;