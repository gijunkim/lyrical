const express = require('express');
const { Song } = require('../models');

const User = require('../models/user');

const { isLoggedIn, isEmailVerified} = require('./middlewares');

const router = express.Router();

// GET /profile/:nickname
router.get('/:nickname', isLoggedIn, isEmailVerified, async (req, res, next) => {
    try{
        const { nickname } = req.params;

        const user = await User.findOne({where: { nickname },
            include: [{ 
                model: Song, 
            }],
            attributes: ['id', 'nickname', 'name', 'email', 'provider']
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