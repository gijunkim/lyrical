const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const { node } = require('webpack');
const router = express.Router();

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
        const emailVerifyKey = await crypto.randomBytes(100).toString('base64');
        await User.create({
            nickname,
            name,
            email,
            password: hash,
            emailVerifyKey
        });

        req.key = emailVerifyKey;
        req.email = email;

        sendMail(req, res, next);

        return res.redirect('/');

    } catch(err){
        console.error(err);
        next(err);
    }
});

// 이메일 인증을 위한 메일 보내기
// TODO : fix
async function sendMail(req, res, next) {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const url = `http://${req.hostname}/confirmEmail?key=${req.key}`;

    try{
        const info = await transporter.sendMail({
            from: "Lyrical <jooyoung@lyrical.com>",
            to: req.email,
            subject: "Lyrical 인증 메일",
            text: "Lyrical 계정 인증 메일 입니다. 계정을 인증 하시려면 아래 링크를 눌러주세요.",
            html: `<b>${url}</b>`
        });
    } catch(err){
        console.error(err);
    }
}

module.exports = router;