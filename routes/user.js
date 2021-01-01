const express = require('express');
const User = require('../models/user');
const { verifyToken, isEmailVerified, notVerifyToken } = require('./middlewares');

const router = express.Router();

// GET /user/:id
router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;

        const user = await User.findOne({where: { id },
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
        error.message = 'GET /user/:id 에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

// POST /user/exist
router.post('/exist', notVerifyToken, async (req, res, next) => {
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