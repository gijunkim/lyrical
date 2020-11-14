const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
    const message = req.query.message || null;
    res.render('login', { title: '로그인 페이지', message: message});
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join', { title: '회원가입 페이지'});
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile', { title: '프로필 페이지'});
});

router.get('/', (req, res, next) => {
    res.render('main', { title: '메인 페이지'});
});

module.exports = router;