const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({ name: "Matteo" });
    next();
})

module.exports = router;
