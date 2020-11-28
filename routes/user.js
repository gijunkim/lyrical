const express = require('express');
const User = require('../models/user');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/exist', isNotLoggedIn, async (req, res, next) => {
    const { nickname, email } = req.body;
    // nickname 중복체크
    if(nickname){
        try{
            const exUser = await User.findOne({ where: { nickname }});
            // 유저가 존재 할 경우
            if(exUser){ res.json({ exist: true }); }
            else{ res.json({ exist: false });}

        } catch(err){
            const error = new Error();
            err.status = 399;
            console.error(err);
            return next(err);
        }
    } else if(email){
        try{
            const exUser = await User.findOne({ where: { email }});
            // 유저가 존재 할 경우
            if(exUser){ res.json({ exist: true }); }
            else{ res.json({ exist: false });}
        } catch(err){
            const error = new Error();
            err.status = 399;
            console.err(err);
            return next(err);
        }
    } else{
        res.json({ exist: false });
    }
});

module.exports = router;