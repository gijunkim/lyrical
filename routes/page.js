const express = require('express');
const { isLoggedIn, isNotLoggedIn, isEmailVerified} = require('./middlewares');

const router = express.Router();

router.get('/login', isNotLoggedIn, (req, res, next) => {
    res.status(204);
    return res.json();
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.status(20);
    return res.json();
});

module.exports = router;