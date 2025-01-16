import mongoose from 'mongoose';
import {ITrack} from "../types";


const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {
                validator: async (value: string): Promise<boolean> => {
                    const track: ITrack | null = await Track.findOne({title: value});
                    return !track;
                },
                message: "Track title already exists"
            },
        ]
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    numberOfTracks: {
        type: Number,
        required: true,
    }
});


export const Track = mongoose.model('Track', TrackSchema);

export default TrackSchema;