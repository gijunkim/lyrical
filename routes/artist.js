const express = require('express');
const { Song } = require('../models');

const Artist = require('../models/artist');
const { isLoggedIn, isEmailVerified } = require('./middlewares');

const router = express.Router();

// POST /artist
router.post('/', isLoggedIn, isEmailVerified, async (req, res, next) => {
    let { name, img, aboutArtist } = req.body;

    // TODO : 동일한 이름 어떻게 중복체크를 할 것인가
    // ex) Harry Styles, harrystyles, BTS, 방탄소년단 등
    if(name){
        try{
            // name으로 url을 생성
            const url = name.replace(/ _/gi, "-").replace(/[^a-z0-9\-]/gi,"");

            const exArtist = await Artist.findOne({ where: { url } });
            
            if(img === undefined) { img = 'default img'; }
            if(aboutArtist === undefined) { aboutArtist = `put some information about ${name}`; }

            if(exArtist){ 
                const error = new Error();
                error.status = 403;
                error.message = `${url}의 URL을 가지는 아티스트가 이미 존재합니다.`;
                next(error);
            } else{
                const artist = await Artist.create({
                    name,
                    url,
                    img,
                    aboutArtist
                });

                // 생성 완료
                res.status(201);
                return res.json({ artist });
            }

        } catch(err){
            const error = new Error();
            error.status = 500;
            error.message = 'POST /artist 에서 에러가 발생하였습니다.';
            console.error(err);
            next(error);
        }
    } else{
        const error = new Error();
        error.status = 400;
        error.message = 'POST /artist name field가 들어오지 않았습니다.';
        next(error);
    }
});

// GET /artist/:url
router.get('/:url', isLoggedIn, isEmailVerified, async (req, res, next) => {
    try{
        const { url } = req.params;

        // url이 형식과 맞는지 확인
        if(url.match(/[^a-z0-9\-]/i)){
            const error = new Error();
            error.status = 400;
            error.message = "artist URL이 형식에 맞지 않습니다.";
            return next(error);
        }

        const artist = await Artist.findAll({ where: { url },
            include: [{ 
                model: Song,
            }, {
                model: Song,
                as: 'Featuring',
            }, {
                model: Song,
                as: 'Producing',
            }, {
                model: Song,
                as: 'Writing',
            }],
        });
        
        if(artist){
            res.status(200);
            return res.json({ artist });
        } else{
            res.status(204);
            return res.json();
        }

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'GET /artist/:url 에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

module.exports = router;