const express = require('express');
const User = require('../models/user');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/exist', isNotLoggedIn, async (req, res, next) => {
    const { nickname, email } = req.body;
    // nickname 중복체크
    if(nickname){
        try{
            const exUser = await User.findOne({ 
                where: {
                    nickname
                }
            });
            
            // 유저가 존재 할 경우
            if(exUser){
                res.status(200);
                return res.json({ exist: true }); 
            }
            else{
                res.status(200);
                return res.json({ exist: false });
            }

        } catch(err){
            const error = new Error();
            error.status = 500;
            error.message = 'POST /exist 처리 중 에러가 발생하였습니다.';
            console.error(err);
            return next(error);
        }
    } else if(email){
        try{
            const exUser = await User.findOne({ where: { email }});
            // 유저가 존재 할 경우
            if(exUser){
                res.status(200);
                return res.json({ exist: true });
            }
            else{
                res.status(200);
                return res.json({ exist: false });
            }
        } catch(err){
            const error = new Error();
            error.status = 500;
            error.message = 'POST /exist 처리 중 에러가 발생하였습니다.';
            console.err(err);
            return next(error);
        }
    } else{
        const error = new Error();
        error.status = 400;
        error.message = '중복체크를 위한 nickname 또는 email이 들어오지 않았습니다.';
        return next(error);
    }
});

module.exports = router;