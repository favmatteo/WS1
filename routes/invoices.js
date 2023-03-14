const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({ invoice: "created" });
    next();
})

router.post('/create', (req, res, next) => {
    res.send({ invoice: "created" });
    next();
})


module.exports = router;
