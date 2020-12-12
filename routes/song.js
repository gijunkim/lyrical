const express = require('express');
const Song = require('../models/song');
const Artist = require('../models/artist');
const Lyrics = require('../models/lyrics');
const { isLoggedIn, isEmailVerified } = require('./middlewares');

const router = express.Router();

//  add relationship between song and features, producers, writtens
const addRelationship = async function(artistsList, song, type){
    const artists = artistsList.split(',');
    const result = await Promise.all(
        artists.map(artist => {
            return Artist.findOne({ where: { name: artist }});
        }),
    );

    switch(type){
        case 'features':
            await song.addFeatures(result.map(artist => artist.id));
            break;
        case 'producers':
            await song.addProducers(result.map(artist => artist.id));
            break;
        case 'writtens':
            await song.addWriters(result.map(artist => artist.id));
            break;
        default:
            break;
    }
};


// POST /song
router.post('/', isLoggedIn, isEmailVerified, async (req, res, next) => {
    const { artist, title, songType, lyrics, features, producers, writtens, release, soundcloud, youtube } = req.body;

    // TODO : 여기서도 중복체크
    // artist 없으면 먼저 만들었다고 가정 front 단에서 promise 활용
    try {
        let exArtist = await Artist.findOne({ where : { name: artist }});

        if(!exArtist){
            exArtist = await Artist.create({
                name : artist,
                img : 'default img',
                aboutArtist: `put some information about ${name}`
            });
        }

        const song = await Song.create({
            title,
            songType,
            release,
            soundcloud,
            youtube
        });

        const lyr = await Lyrics.create({
            lyrics
        });

        // user 추가
        await song.setUser(req.user);
        // artist 추가
        await song.setArtist(exArtist);
        await song.setLyric(lyr);

        // featuring 추가
        if(features){
            addRelationship(features, song, 'features');
        }

        // producer 추가
        if(producers){
            addRelationship(producers, song, 'producers');
        }
        
        // writer 추가
        if(writtens){
            addRelationship(writtens, song, 'writtens');
        }
        
        return res.json({ status : 'okay', song });

    } catch(err){
        const error = new Error();
        error.status = 399;
        error.code = 'POST song error';
        console.error(err);
        return next(error);
    }
});


module.exports = router;