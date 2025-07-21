import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true
    },

    clicks: {
        type: Number,
        default: 0
    },

    lastVisited: {

        type: Date,
        default: null,

    },

    createdAt: {
        type: Date,
        default: Date.now,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
},
{ timestamps: true }
)

export const urlmodel = mongoose.model('Url', urlSchema)