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
            if(exUser){ res.json({ status : 'okay', exist: true }); }
            else{ res.json({ status : 'okay', exist: false });}

        } catch(err){
            const error = new Error();
            error.status = 399;
            error.code = 'exist nickname error';
            console.error(err);
            return next(error);
        }
    } else if(email){
        try{
            const exUser = await User.findOne({ where: { email }});
            // 유저가 존재 할 경우
            if(exUser){ res.json({ status : 'okay', exist: true }); }
            else{ res.json({ status : 'okay', exist: false });}
        } catch(err){
            const error = new Error();
            error.status = 399;
            error.code = 'exist email error';
            console.err(err);
            return next(error);
        }
    } else{
        res.json({ status : 'bad', exist: false });
    }
});

module.exports = router;