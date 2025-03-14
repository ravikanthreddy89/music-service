const mongoose = require('mongoose');

const SongSchema2 = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    playListId: {
        type: String,
        required : [true]
    },
    artist: {
        type: String,
    },
    album: {
        type: String,        
    },
    genre: {
        type: String,
    },
    created_at: {
        type: Date,
        
    },
    duration: {
        type: Number,        
    },
    url: {
        type: String,        
    },
});

module.exports = mongoose.model('Song3', SongSchema2);