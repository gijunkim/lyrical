const express = require('express');
const User = require('../models/user');
const Song = require('../models/song');
const Artist = require('../models/artist');
const Lyrics = require('../models/lyrics');
const { isLoggedIn, isEmailVerified } = require('./middlewares');

const router = express.Router();

// POST /song
router.post('/', isLoggedIn, isEmailVerified, async (req, res, next) => {
    const { artist, title, songType, lyrics, features, producers, writtens, release, soundCloud, youtube } = req.body;

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
            soundCloud,
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
            const feats = features.split(',');
            const result = await Promise.all(
                feats.map(feat => {
                    return Artist.findOne({ where: { name: feat}});
                }),
            );
            await song.addFeatures(result.map(r => r.id));
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