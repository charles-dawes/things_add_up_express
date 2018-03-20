var express = require('express');
var router = express.Router();
var pgp = require('pg-promise')();
var jwt = require('jsonwebtoken');
var jsSHA = require("jssha");

//JWT Config
jwt.verifyToken = function(reqToken){
  return verifyToken(reqToken);
};
var verifyToken = function(reqToken){
  if (token === reqToken){
    return true;
  } else {
    return false;
  }
}


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
router.post('/post/create/user', function(req, res, next) {
  db.oneOrNone("Select * from public.get_user_by_phone_number($1::text)", [req.body.phoneNumber]).then((data) => {
    if (data == null){
      createUser(req, res, next);
    } else {
      res.json({created: 'user already exists'});
    }
  })
});


//API FUNCTIONS
  //GET
function getUserById(req, res, next){
  if (!isNaN(req.params.id)){
    db.oneOrNone('SELECT * from public.get_user($1)', [req.params.id])
      .then(function(data){
        if (data === null){
          res.json({message:"user not found"})
        }
        res.send(data);

    });
  } else {
    db.oneOrNone('SELECT * from public.get_user_by_token($1)', [req.params.id])
      .then(function(data){
        res.send(data);
    });
  }

}


  //POST
function createUser(req, res, next){
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let hashedPassword = hashString(req.body.password);
  let token = genToken(firstName + lastName);
  let phoneNumber = req.body.phoneNumber;
  const createUser = {
    name: 'get-user',
    text: 'SELECT * from public.put_user($1::text, $2::text, $3::text, $4::text, $5::text)',
    values: [firstName, lastName, phoneNumber, token, hashedPassword],
    rowMode: 'array'
  };
  db.any(createUser).then((data) => {
    res.json({created: data[0][0]});
  })
  //console.log(firstName, lastName, hashedPassword, token, phoneNumber);

}



//HELPER FUNCTIONS

function hashString(value){
  var shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update(value);
  return shaObj.getHash("HEX");
}

function genToken(value){
  return jwt.sign(value,  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
}

module.exports = router;
