const express = require('express');
const { Song } = require('../models');

const User = require('../models/user');

const { isLoggedIn, isEmailVerified} = require('./middlewares');

const router = express.Router();

// GET /profile/:id
router.get('/:id', isLoggedIn, isEmailVerified, async (req, res, next) => {
    try{
        const { id } = req.params;

        const user = await User.findOne({
            where: { id },
            include: [{ 
                model: Song, 
            }],
            attributes: ['id', 'nickname', 'name', 'email', 'provider']
        });

        if(user){
            return res.json({ user });
        } else{
            return res.json({ status : 'bad'});
        }
    } catch(err){
        const error = new Error();
        error.status = 399;
        error.code = 'GET profile error';
        console.error(err);
        return next(error);
    }
});

module.exports = router;