var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();

//SETUP DB CONNECTION
const con = {
  user: 'homelessadmin',
  host: 'homelessapp.comf0z7yu2yl.us-east-2.rds.amazonaws.com',
  database: 'homeless_app',
  password: 'GreenChicken18',
  port: 5432,
};
const db = pgp(con);


/*get root api message*/
router.get('/', function(req, res, next) {
  res.json({message: 'yay! api is working!'});
});

//GET REQUESTS SECTION
router.get('/get/user/:id', function(req, res, next) {
  //res.json({message: req.params.id});
  getUserById(req, res, next);
});


//POST REQUESTS SECTION




function getUserById(req, res, next){
  if (!isNaN(req.params.id)){
    db.one('SELECT * from public.get_user($1)', [req.params.id])
      .then(function(data){
        res.send(data);
    });
  } else {
    db.one('SELECT * from public.get_user_by_token($1)', [req.params.id])
      .then(function(data){
        res.send(data);
    });
  }

}


module.exports = router;
