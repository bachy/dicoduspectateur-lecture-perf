var express = require('express');
var router = express.Router();
var data = require('./../data/data.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO: here get the list of words from dico
  // console.log(data.list);
  res.render('index', { body_class:"stage", title: 'Lecture Dico', list:data.list });
});

module.exports = router;
