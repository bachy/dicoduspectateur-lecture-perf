var express = require('express');
var router = express.Router();
var data = require('./../data/data.json');

/* GET remote control interface. */
router.get('/', function(req, res, next) {
  res.render('remote', { body_class:"remote", title: 'Lecture Dico Remote Control', list:data.list });
});

module.exports = router;
