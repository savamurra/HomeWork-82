import mongoose from "mongoose";
import { IArtist } from "../types";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: async (value: string): Promise<boolean> => {
          const artist: IArtist | null = await Artist.findOne({ name: value });
          return !artist;
        },
        message: "Artist already exists",
      },
    ],
  },
  photo: {
    type: String,
    default: null,
  },
  info: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Artist = mongoose.model("Artist", ArtistSchema);

export default ArtistSchema;
