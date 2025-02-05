import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  datetime: {
    type: String,
    default: () => new Date().toISOString(),
    required: true,
  },
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);

export default TrackHistory;
