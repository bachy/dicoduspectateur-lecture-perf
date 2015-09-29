var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: here get the list of words from dico
  res.render('index', { title: 'Lecture Dico' });
});

module.exports = router;
