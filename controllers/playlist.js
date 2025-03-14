const Playlist = require('../models/Playlist');

const {isEmpty} = require('lodash');
const Song2 = require('../models/Song2');

exports.createPlaylist = async (req, res) => {
    // retrieve the elemenst from req body
    const {name, icon_uri = ''} = req.body;

    if(isEmpty(name)){
        return res.status(400)
        .json({ error: 'Name is required to create playlist' });
    }

    const entity = new Playlist({
        name,
        icon_uri,
        created_at :  Date.now(),
        update_at : Date.now()
    });
    
    const savedEntity = await entity.save({});

    return res.status(201)
    .json(savedEntity);

}

exports.fetchById = async(req, res)=> {
    const id = req.params.playlistId;

    const playlist = await Playlist.findById(id);

    if(isEmpty(playlist))return res.status(404)
        .json({ error: 'No playlist found' });

    const songs = await Song2.find({playListId: id})
    
    const {_id , name} = playlist;
    const respOjb = {
        id: _id, name, 
        songs : isEmpty(songs) ? [] : songs
    }
    return res.status(200).json(respOjb);

}



