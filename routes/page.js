const express = require('express');
const { isLoggedIn, isNotLoggedIn, isEmailVerified} = require('./middlewares');

const router = express.Router();

router.get('/login', isNotLoggedIn, (req, res, next) => {
    return res.json({ status : 'okay'});
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    return res.json({ status : 'okay'});
});

router.get('/profile', isLoggedIn, isEmailVerified, (req, res, next) => {
    return res.json({ status : 'okay', user : req.user});
});

module.exports = router;