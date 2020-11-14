const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/exist', (req, res, next) => {
    console.log(req.body);
    res.send({response: false});
});

module.exports = router;