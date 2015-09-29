var express = require('express');
var router = express.Router();

/* GET remote control interface. */
router.get('/', function(req, res, next) {
    res.render('remote', { title: 'Remote control' });
});

module.exports = router;
