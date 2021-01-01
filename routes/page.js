const express = require('express');
const { isLoggedIn, isNotLoggedIn, isEmailVerified, verifyToken} = require('./middlewares');

const router = express.Router();

// GET /login
router.get('/login', isNotLoggedIn, (req, res, next) => {
    res.status(204);
    return res.json();
});

// GET /join
router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.status(204);
    return res.json();
});

// GET /token
router.get('/token', verifyToken, (req, res, next) => {
    res.status(200);
    return res.json({ headers: req.headers });
});

module.exports = router;