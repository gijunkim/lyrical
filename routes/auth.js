const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { node } = require('webpack');
const passport = require('passport');
const { runInNewContext } = require('vm');
const router = express.Router();


/** 로그인 **/

// 로컬 로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, message) => {
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${message.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

// 카카오 로그인
router.get('/kakao', isNotLoggedIn, passport.authenticate('kakao'));

router.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    return res.redirect('/');
});

// 구글 로그인
router.get('/google', isNotLoggedIn, passport.authenticate('google', { scope: ['profile' , 'email'] }));

router.get('/google/callback', isNotLoggedIn, passport.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    return res.redirect('/');
});

/** 로그 아웃 **/
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy();
    return res.redirect('/?logout');
});

/** 회원가입 **/
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { nickname, name, email, password } = req.body;

    // TODO: 각각이 조건에 맞는지 확인
    try {
        const exUser = await User.findOne({where: {nickname}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const exUser2 = await User.findOne({where: {email}});
        if(exUser2){
            return res.redirect('/join?error=exist');
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

        return res.redirect('/');

    } catch(err){
        console.error(err);
        next(err);
    }
});


/** verification **/
// 이메일 인증 키 재전송
router.post('/verification/resend-email-key', isNotLoggedIn, async (req, res, next) => {
    const { id } = req.body;

    try {
        const exUser = await User.findOne({where: {id}});
        if(!exUser){
            return res.redirect('/?error=notExist');
        } else{
            // 이메일 인증키 생성
            const emailVerifyKey = await crypto.randomBytes(100).toString('hex');
            // 인증키 만료 날짜 10분
            const keyExpire = Date.now() + 600000
            const user = await User.update({
                emailVerifyKey,
                keyExpire
            }, {where: {id}});

            req.userId = user.id;
            req.key = emailVerifyKey;
            req.email = email;

            //sendMail(req, res, next);

            return res.redirect('/');
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
});

// verification
// 이메일 인증 확인
router.get('/verification/verify-account/:id/:emailKey', isNotLoggedIn, async (req, res, next) => {
    const { id, emailKey } = req.params;

    try {
        const exUser = await User.findOne({where: {id}});
        if(!exUser){
            // TODO: 라우터 추가
            return res.redirect('/auth/verification/verify-account?error=notExist');
        } else{

            if(exUser.emailVerifyKey == emailKey && exUser.keyExpire > Date.now()){
                await User.update({ emailVerification : true},{where: {id}});
                // TODO: 라우터 추가
                return res.redirect('/auth/verification/verify-account?error=success');
            } else{
                // TODO: 라우터 추가
                return res.redirect('/auth/verification/verify-account?error=keyFalse');
            }
            
        }
    } catch(err) {
        console.error(err);
        next(err);
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