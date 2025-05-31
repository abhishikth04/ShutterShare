const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    }],
    isPublic: {
        type: Boolean,
        default: false,
    },
    publicCode: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Space", spaceSchema);


