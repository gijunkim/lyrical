const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const passport = require('passport');
const router = express.Router();

const { body, validationResult} = require('express-validator');


/** 로그인 **/

// 로컬 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', { session: false }, (authError, user, message) => {
        if(authError){
            const error = new Error();
            error.status = 500;
            error.message = `local login authError ${authError}`;
            console.log(authError);
            return next(error);
        }
        if(!user){
            const error = new Error();
            error.status = 400;
            error.message = "이메일 또는 패스워드를 잘못 입력했습니다.";
            return next(error);
        }
        return req.login(user, { session: false }, (loginError) => {
            if(loginError){
                const error = new Error();
                error.status = 500;
                error.message = `local login loginError ${loginError}`;
                console.log(loginError);
                return next(error);
            }

            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1m', issuer : 'lyrical'});
            res.status(200);
            return res.json({user, token});
        });
    })(req, res, next);
});

// 카카오 로그인
router.get('/kakao', isNotLoggedIn, passport.authenticate('kakao', { session: false }));

router.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', { session: false }, (authError, user) => {
    if(authError){
        const error = new Error();
        error.status = 500;
        error.message = `local login authError ${authError}`;
        console.log(authError);
        return next(error);
    }
    if(!user){
        const error = new Error();
        error.status = 400;
        error.message = "이메일 또는 패스워드를 잘못 입력했습니다.";
        return next(error);
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1m', issuer : 'lyrical'});
    res.status(200);
    return res.json({user, token});
}));

// 구글 로그인
router.get('/google', isNotLoggedIn, passport.authenticate('google', { scope: ['profile' , 'email'], session : false }));

router.get('/google/callback', isNotLoggedIn, passport.authenticate('google', {session : false}, (authError, user) => {
    if(authError){
        const error = new Error();
        error.status = 500;
        error.message = `local login authError ${authError}`;
        console.log(authError);
        return next(error);
    }
    if(!user){
        const error = new Error();
        error.status = 400;
        error.message = "이메일 또는 패스워드를 잘못 입력했습니다.";
        return next(error);
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '1m', issuer : 'lyrical'});
    res.status(200);
    return res.json({user, token});
}));

/** 로그 아웃 **/
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.status(204);
    return res.json();
});

/** 회원가입 **/
router.post('/join', isNotLoggedIn, [ body('email').isEmail() ], async (req, res, next) => {
    const { nickname, name, email, password } = req.body;

    // 들어온 데이터가 없는 경우
    if(!nickname || !name || !email || !password){
        const error = new Error();
        error.status = 400;
        error.message = '회원가입 정보가 충분하지 않습니다.';
        return next(error);
    }

    const emailError = validationResult(req);
    if(!emailError.isEmpty()){
        const error = new Error();
        error.status = 400;
        error.message = 'email 형식이 올바르지 않습니다.';
        return next(error);
    }

    // nickname이 정책과 맞는지 확인
    // letters, numbers, -만 가능 20글자 이내
    if(nickname.match(/[^a-z0-9\-]/i) || nickname.length > 20){
        const error = new Error();
        error.status = 400;
        error.message = 'nickname 형식이 올바르지 않습니다.';
        return next(error);
    }

    try {
        const exUser = await User.findOne({ where: { nickname } });

        if(exUser){
            const error = new Error();
            error.status = 403;
            error.message = `해당 ${nickname}의 유저가 이미 존재합니다.`;
            return next(error);
        }
        const exUser2 = await User.findOne({where: { email }});
        if(exUser2){
            const error = new Error();
            error.status = 403;
            error.message = `해당 ${email}의 유저가 이미 존재합니다.`;
            return next(error);
        }

        const hash = await bcrypt.hash(password, 12);
        // 이메일 인증키 생성
        const emailVerifyKey = await crypto.randomBytes(100).toString('hex').substr(0,100);
        // 인증키 만료 날짜 10분
        const keyExpire = Date.now() + 600000
        const user = await User.create({
            nickname,
            name,
            email,
            password: hash,
            emailVerifyKey,
            keyExpire
        });

        req.userId = user.id;
        req.key = emailVerifyKey;
        req.email = email;

        //sendMail(req, res, next);

        res.status(201);
        return res.json({user});

    } catch(err){
        const error = new Error();
        error.status = 500;
        error.message = 'POST /join 에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});


/** verification **/
// 이메일 인증 키 재전송
router.post('/verification/resend-email-key', isLoggedIn, async (req, res, next) => {
    const { id } = req.body;

    try {
        const exUser = await User.findOne({where: {id}});
        if(!exUser){
            const error = new Error();
            error.status = 403;
            error.message = `해당 ${id}의 유저가 존재하지 않습니다.`;
            return next(error);
        } else{
            // 이메일 인증키 생성
            const emailVerifyKey = await crypto.randomBytes(100).toString('hex').substr(0,100);
            // 인증키 만료 날짜 10분
            const keyExpire = Date.now() + 600000
            const user = await User.update({
                emailVerifyKey,
                keyExpire
            }, {where: {id}});

            req.userId = user.id;
            req.key = emailVerifyKey;
            req.email = user.email;

            //sendMail(req, res, next);

            res.status(204);
            return res.json();
        }
    } catch(err) {
        const error = new Error();
        error.status = 500;
        error.message = 'POST /verificaion/resend-email-key 에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});

// verification
// 이메일 인증 확인
router.get('/verification/verify-account/:id/:emailKey', async (req, res, next) => {
    const { id, emailKey } = req.params;

    try {
        const exUser = await User.findOne({where: {id}});
        if(!exUser){
            // TODO: 라우터 추가
            const error = new Error();
            error.status = 403;
            error.message = `해당 ${id}의 유저가 존재하지 않습니다.`;
            return next(error);
        } else{
            if(exUser.emailVerification){
                const error = new Error();
                error.status = 400;
                error.message = `이미 이메일 인증이 되었습니다.`;
                return next(error);
            }

            if(exUser.emailVerifyKey == emailKey && exUser.keyExpire > Date.now()){
                await User.update({ emailVerification : true},{where: {id}});
                // TODO: 라우터 추가
                res.status(204);
                return res.json();
            } else{
                // TODO: 라우터 추가
                const error = new Error();
                error.status = 400;
                error.message = `인증 키가 일치하지 않거나 또는 유효기간이 지났습니다.`;
                return next(error);
            }
            
        }
    } catch(err) {
        const error = new Error();
        error.status = 500;
        error.message = 'GET /verificaion/verify-account 에서 에러가 발생하였습니다.';
        console.error(err);
        return next(error);
    }
});


// 이메일 인증을 위한 메일 보내기
// TODO : fix
async function sendMail(req, res, next) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: process.env.GMAIL_USER,    
        to: req.email,                     
        subject: 'Lyrical 인증 메일', 
        text: 'Lyrical 인증 메일 테스트' 
    };

    try{
        const info = await transporter.sendMail(mailOptions);
    } catch(err){
        console.log(err);   
    }
}

module.exports = router;