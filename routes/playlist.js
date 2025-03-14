const express = require('express');

const {createPlaylist, fetchById} = require('../controllers/playlist');
const {addSong, removeSong} = require('../controllers/song');


const router = express.Router();

router.post('/', createPlaylist);

router.get('/:playlistId', fetchById)

router.post('/:playlistId/song', addSong);
router.delete('/:playlistId/song/:songId', removeSong);


module.exports = router;