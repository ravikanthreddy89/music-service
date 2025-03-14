const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    icon_uri: {
        type: String
    },
    songs: {
        type: Array
    },
});

module.exports = mongoose.model('Song', SongSchema);