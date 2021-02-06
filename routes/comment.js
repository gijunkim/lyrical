const express = require('express');

const { Album, Annotation, Artist, Comment, Song } = require('../models');

const { verifyToken, isEmailVerified } = require('./middlewares');
const router = express.Router();

// comment/album/:artistURL/:albumURL
router.post('/album/:artistURL/:albumURL', verifyToken, isEmailVerified, async (req, res, next) => {
    try{
        let { artistURL, albumURL } = req.params;
        const { content } = req.body;

        if(!content){
            const error = new Error();
            error.status = 400;
            error.message = "POST /comment/album 요청의 정보가 충분하지 않습니다.";
            return next(error);
        }

        artistURL = artistURL.replace(/[^a-z0-9]/gi,"").toLowerCase();
        albumURL = albumURL.replace(/[^a-z0-9]/gi,"").toLowerCase();

        const exArtist = await Artist.findOne({ where : { url : artistURL }});
        let exAlbum = await exArtist.getAlbums({ 
            where: { url: albumURL },
        });

        exAlbum = exAlbum[0];

        if(!exAlbum){
            const error = new Error();
            error.status = 400;
            error.message = "POST /comment/album 해당 album이 존재하지 않습니다.";
            return next(error);
        }

        const newComment = await Comment.create({
            content
        });

        await newComment.setUser(req.user);
        await exAlbum.addComment(newComment);

        res.status(201);
        return res.json({ newComment });

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST comment/album/:artistURL/:albumURL 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

// comment/song/:artistURL/:songURL
router.post('/song/:artistURL/:songURL', verifyToken, isEmailVerified, async (req, res, next) => {
    try{
        let { artistURL, songURL } = req.params;
        const { content } = req.body;

        if(!content){
            const error = new Error();
            error.status = 400;
            error.message = "POST /comment/song 요청의 정보가 충분하지 않습니다.";
            return next(error);
        }

        artistURL = artistURL.replace(/[^a-z0-9]/gi,"").toLowerCase();
        songURL = songURL.replace(/[^a-z0-9]/gi,"").toLowerCase();

        const exArtist = await Artist.findOne({ where : { url : artistURL }});
        const exSong = await exArtist.getSong({ 
            where: { url: songURL },
        });

        if(!exSong){
            const error = new Error();
            error.status = 400;
            error.message = "POST /comment/song 해당 song이 존재하지 않습니다.";
            return next(error);
        }

        const newComment = await Comment.create({
            content
        });

        await newComment.setUser(req.user);
        await exSong.addComment(newComment);

        res.status(201);
        return res.json({ newComment });

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST comment/song/:artistURL/:songURL 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

// comment/annotation/:artistURL/:songURL/:annotationId
router.post('/annotation/:artistURL/:songURL/:annotationId', verifyToken, isEmailVerified, async (req, res, next) => {
    try{
        let { artistURL, songURL, annotationId } = req.params;
        const { content } = req.body;

        if(!content){
            const error = new Error();
            error.status = 400;
            error.message = "POST /comment/annotation 요청의 정보가 충분하지 않습니다.";
            return next(error);
        }

        artistURL = artistURL.replace(/[^a-z0-9]/gi,"").toLowerCase();
        songURL = songURL.replace(/[^a-z0-9]/gi,"").toLowerCase();

        const exArtist = await Artist.findOne({ where : { url : artistURL }});
        const exSong = await exArtist.getSong({ 
            where: { url: songURL },
        });
        let exAnnotation = await exSong.getAnnotations({
            where: { id: annotationId },
        })

        exAnnotation = exAnnotation[0];

        if(!exAnnotation){
            const error = new Error();
            error.status = 400;
            error.message = "POST /comment/annotation 해당 annotation이 존재하지 않습니다.";
            return next(error);
        }

        const newComment = await Comment.create({
            content
        });

        await newComment.setUser(req.user);
        await exAnnotation.addComment(newComment);

        res.status(201);
        return res.json({ newComment });

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST comment/annotation/:artistURL/:songURL/:annotationId 과정에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

module.exports = router;