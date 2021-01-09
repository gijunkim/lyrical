const express = require('express');
const { isEmailVerified, verifyToken} = require('./middlewares');

const router = express.Router();

// GET /login
router.get('/login', (req, res, next) => {
    res.status(204);
    return res.json();
});

// GET /join
router.get('/join', (req, res, next) => {
    res.status(204);
    return res.json();
});

// GET /token
router.get('/token', verifyToken, (req, res, next) => {
    res.status(200);
    console.log(req.headers);
    return res.json({ headers: req.headers, user: req.user });
});

module.exports = router;