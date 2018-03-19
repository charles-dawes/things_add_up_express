var express = require('express');
var router = express.Router();
/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'ThingsAddUp Register'});
});

module.exports = router;
