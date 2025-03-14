
const Song2 = require('../models/Song2');
const {isEmpty} = require('lodash');

exports.addSong = async (req, res)=> {
    const song = req.body;
    const playListId = req.params.playlistId;

    // run some validations
    const { name, album, artist} = song;
    if(isEmpty(name) || isEmpty(playListId)){
        return res.status(400)
        .json({ error: 'Name & playlist are required to create a song' });
    }

    const entity = new Song2({...song,
        created_at :  Date.now(),
        update_at : Date.now(),
        playListId
    });

    const savedEntity = await entity.save();

    return res.status(201).json(savedEntity);
}

exports.removeSong = async (req, res)=> {
    const songId = req.params.songId;
    //const playListId = req.params.playListId;

    // run some validations
    if(isEmpty(songId) ){
        return res.status(400)
        .json({ error: 'Id is needed to remove a song' });
    }
    const entity = await Song2.findById(songId);

    await entity.deleteOne();

    return res.status(200).json({message: "Successfully deleted the song"});
}