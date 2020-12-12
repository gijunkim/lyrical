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
            const exArtist = await Artist.findOne({ where: { name }});
            
            if(img === undefined) { img = 'default img'; }
            if(aboutArtist === undefined) { aboutArtist = `put some information about ${name}`; }

            console.log(name, img, aboutArtist);

            if(exArtist){ 
                return res.json({ status : 'bad', code : 'artist exist'}); 
            } else{
                const artist = await Artist.create({
                    name,
                    img,
                    aboutArtist
                });

                return res.json({ status : 'okay', artist});
            }

        } catch(err){
            const error = new Error();
            error.status = 399;
            error.code = 'POST artist error';
            console.error(err);
            return next(error);
        }
    } else{
        return res.json({ status: 'bad'});
    }
});

// GET /artist/:id
router.get('/:id', isLoggedIn, isEmailVerified, async (req, res, next) => {
    try{
        const { id } = req.params;

        const artist = await Artist.findAll({
            where: { id },
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
            return res.json({ artist });
        } else{
            return res.json({ status : 'bad'});
        }

    } catch(err){
        const error = new Error();
        error.status = 399;
        error.code = 'POST artist error';
        console.error(err);
        return next(error);
    }
});

module.exports = router;