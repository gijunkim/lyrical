const express = require('express');
const { Song, User, Annotation, Comment, Artist } = require('../models');

const { verifyToken, isEmailVerified} = require('./middlewares');

const router = express.Router();

// GET /profile/:nickname
router.get('/:nickname', async (req, res, next) => {
    try{
        const { nickname } = req.params;

        const user = await User.findOne({ where: { nickname },
            include: [{ 
                model: Song,
                attributes: ["title", "url", "view"],
                include: [{
                    model: Artist,
                    attributes: ["name", "url"],
                }]
            }, {
                model: Annotation,
                attributes: ['id', 'annotation'],
                include: [
                    {
                        model: Song,
                        attributes: ["title", "url", "view"],
                        include: [{
                            model: Artist,
                            attributes: ["name", "url"],
                        }]
                    },
                    {
                        model: Comment,
                        attributes: ["id", "content", "SongId", "AnnotationId", "AlbumId"]
                    }
                ]
            }],
            attributes: ['nickname', 'name', 'emailVerification']
        });

        if(user){
            res.status(200);
            return res.json({ user });
        } else{
            res.status(204);
            return res.json();
        }
    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'GET /profile/:nickname 에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

module.exports = router;