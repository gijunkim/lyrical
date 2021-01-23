const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Song, Artist } = require('../models');

const { verifyToken, isEmailVerified } = require('./middlewares');

const router = express.Router();

try{
    fs.readdirSync('uploads');
} catch(err){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});


// GET /album/:artistURL/:albumURL
router.get('/:artistURL/:albumURL', async (req, res, next) => {
    try{
        const { artistURL, albumURL } = req.params;

        // url이 형식과 맞는지 확인
        if(artistURL.match(/[^a-z0-9\-]/i) || albumURL.match(/[^a-z0-9\-]/i)){
            const error = new Error();
            error.status = 400;
            error.message = "artist URL 또는 album URL이 형식에 맞지 않습니다.";
            return next(error);
        }

        const exArtist = await Artist.findOne({ where : { url : artistURL }});
        const exAlbum = await exArtist.getAlbum({ 
            where: { url: albumURL },
            include: [
                {
                    model: Song,
                }
            ]
        });

        if(exAlbum){
            res.status(200);
            return res.json({ album: exAlbum});
        } else {
            res.status(204);
            return res.json();
        }

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'GET /album/:artistURL/:albumURL 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

// POST /album
const upload2 = multer();
router.post('/', verifyToken, isEmailVerified, upload2.none(), async (req, res, next) => {
    const { artist, title, cover, release } = req.body;

    if(!artist || !title){
        const error = new Error();
        error.status = 400;
        error.message = "POST /album 요청의 정보가 충분하지 않습니다.";
        return next(error);
    }

    // TODO : 여기서도 중복체크
    // artist 없으면 먼저 만들었다고 가정 front 단에서 promise 활용
    try {
        const artistURL = artist.replace(/ _/gi, "-").replace(/[^a-z0-9\-]/gi,"");
        const albumURL = title.replace(/ _/gi, "-").replace(/[^a-z0-9\-]/gi,"");

        let exArtist = await Artist.findOne({ where : { url : artistURL }});

        if(!exArtist){
            exArtist = await Artist.create({
                name : artist,
                url : artistURL,
                img : 'default img',
                aboutArtist: `put some information about ${artist}`
            });
        } else {
            // 해당 artist에 해당 album 정보가 있는지 확인
            const exAlbum = await exArtist.getAlbum({
                where: {
                    url: albumURL
                }
            });

            if(exAlbum){
                const error = new Error();
                error.status = 403;
                error.message = `${artist} 의 앨범 ${title}이 존재합니다.`;
                return next(error);
            }

        }

        const album = await Album.create({
            title,
            cover,
            url: albumURL,
            release,
        });

        // artist 추가
        await album.setArtist(exArtist);
        
        res.status(201);
        return res.json({ album });

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST /album 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

// POST /album/img
router.post('/img', verifyToken, isEmailVerified, upload.array('single'), async (req, res, next) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}`});
});

module.exports = router;