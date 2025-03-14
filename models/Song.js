const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    artist: {
        type: String,
        required: [true, 'Please provide an artist'],
    },
    album: {
        type: String,
        required: [true, 'Please provide an album'],
    },
    genre: {
        type: String,
        required: [true, 'Please provide a genre'],
    },
    release_date: {
        type: Date,
        required: [true, 'Please provide a release date'],
    },
    duration: {
        type: Number,
        required: [true, 'Please provide a duration'],
    },
    url: {
        type: String,
        required: [true, 'Please provide a url'],
    },
});

module.exports = mongoose.model('Song', SongSchema);