const express = require('express');

const { Song, Artist, Annotation, Album } = require('../models');

const { verifyToken, isEmailVerified } = require('./middlewares');

const router = express.Router();

//  add relationship between song and features, producers, writtens
const addRelationship = async function(artistsList, song, type){
    const artists = artistsList.split(',');
    const result = await Promise.all(
        artists.map(async (artist) => {
            let exArtist = await Artist.findOne({ where : { name : artist }});

            if(!exArtist){
                const artistURL = artist.replace(/[^a-z0-9]/gi,"").toLowerCase();

                exArtist = await Artist.create({
                    name : artist,
                    url : artistURL,
                    img : 'default img',
                    aboutArtist: `put some information about ${artist}`
                });
            }

            return exArtist;
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
router.post('/', verifyToken, isEmailVerified, async (req, res, next) => {
    const { artist, title, songType, lyrics, features, producers, writtens, release, soundcloud, youtube, album } = req.body;

    if(!artist || !title || !songType || !lyrics){
        const error = new Error();
        error.status = 400;
        error.message = "POST /song 요청의 정보가 충분하지 않습니다.";
        return next(error);
    }

    // TODO : 여기서도 중복체크
    // artist 없으면 먼저 만들었다고 가정 front 단에서 promise 활용
    try {
        const artistURL = artist.replace(/[^a-z0-9]/gi,"").toLowerCase();
        const songURL = title.replace(/[^a-z0-9]/gi,"").toLowerCase();
        const albumURL = album.replace(/[^a-z0-9]/gi,"").toLowerCase();

        let exArtist = await Artist.findOne({ where : { url : artistURL }});

        if(!exArtist){
            exArtist = await Artist.create({
                name : artist,
                url : artistURL,
                img : 'default img',
                aboutArtist: `put some information about ${artist}`
            });
        } else {
            // 해당 artist에 해당 song 정보가 있는지 확인
            const exSong = await exArtist.getSong({
                where: {
                    url: songURL
                }
            });

            if(exSong){
                const error = new Error();
                error.status = 403;
                error.message = `${artist} 의 ${title}이 존재합니다.`;
                return next(error);
            }
        }
        const song = await Song.create({
            title,
            url : songURL,
            songType,
            lyrics,
            release,
            soundcloud,
            youtube
        });

        // user 추가
        await song.setUser(req.user);
        // artist 추가
        await song.setArtist(exArtist);

        // featuring 추가
        if(features){
            await addRelationship(features, song, 'features');
        }

        // producer 추가
        if(producers){
            await addRelationship(producers, song, 'producers');
        }
        
        // writer 추가
        if(writtens){
            await addRelationship(writtens, song, 'writtens');
        }

        // album 추가
        if(album){
            let exAlbum = await exArtist.getAlbums({ where: { url : albumURL }});

            exAlbum = exAlbum[0];

            if(!exAlbum){
                exAlbum = await Album.create({
                    title: album,
                    url : albumURL,
                });

                await exAlbum.setArtist(exArtist.id);
            }

            await song.setAlbum(exAlbum);
        }

        res.status(201);
        return res.json({ song });

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST /song 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});


// GET /song/:artistURL/:songURL
router.get('/:artistURL/:songURL', async (req, res, next) => {
    try{
        let { artistURL, songURL } = req.params;

        artistURL = artistURL.replace(/[^a-z0-9]/gi,"").toLowerCase();
        songURL = songURL.replace(/[^a-z0-9]/gi,"").toLowerCase();

        const exArtist = await Artist.findOne({ where : { url : artistURL }});
        const exSong = await exArtist.getSong({ 
            where: { url: songURL },
            include: [
                {
                    model: Artist,
                    as: 'Features',
                }, {
                    model: Artist,
                    as: 'Producers',
                }, {
                    model: Artist,
                    as: 'Writers',
                }, {
                    model: Annotation,
                }
            ]
        });

        if(exSong){
            res.status(200);
            return res.json({ song: exSong, artist: exArtist});
        } else {
            res.status(204);
            return res.json();
        }

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'GET /song/:artistURL/:songURL 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }

});

// POST /song/:artistURL/:songURL/annotation
router.post('/:artistURL/:songURL/annotation', verifyToken, isEmailVerified ,async (req, res, next) => {
    try{
        let { artistURL, songURL } = req.params;
        const { before, offset, length, lyrics, annotation, after } = req.body;

        artistURL = artistURL.replace(/[^a-z0-9]/gi,"").toLowerCase();
        songURL = songURL.replace(/[^a-z0-9]/gi,"").toLowerCase();

        const exArtist = await Artist.findOne({ where : { url : artistURL }});
        const exSong = await exArtist.getSong({ 
            where: { url: songURL }
        });

        // TODO : 중복체크 및 제대로 들어왔는지 확인
        // after, before length 제한
        const newAnnotation = await Annotation.create({
            before : before.substr(0,10),
            offset,
            length,
            lyrics,
            annotation,
            after : after.substr(0,10)
        });

        await exSong.setAnnotations(newAnnotation);
        await newAnnotation.setUser(req.user.id);

        console.log(exSong);
        console.log(newAnnotation);

        if(exSong){
            res.status(200);
            return res.json({ song: exSong});
        } else {
            res.status(204);
            return res.json();
        }

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST /song/:artistURL/:songURL/annotation 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }

});

module.exports = router;