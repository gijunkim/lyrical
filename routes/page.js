const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

router.get('/login', isNotLoggedIn, (req, res, next) => {
    const message = req.query.message || null;
    res.render('login');
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join');
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile');
});

router.get('/', (req, res, next) => {
    res.render('main');
});

module.exports = router;