const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
    const message = req.query.message || null;
    res.send({ username: 'jooyoung' });
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.send({ title: '회원가입 페이지'});
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.send({ title: '프로필 페이지'});
});

router.get('/', (req, res, next) => {
    res.send({  username: 'jooyoung'});
});

module.exports = router;