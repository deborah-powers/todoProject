var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var dbName = 'mongol';
var tokenList = [];
var app = express();
var _client = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});


function randomToken() {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = 0; i < 32; i++) {
    result += string[Math.floor(Math.random() * (string.length - 1))];
  }
  return result;
}

function tokenCheck(token) {
  var result = tokenList.find(function (element) {
    return element == token;
  });
  return result;
}

function findUser(name) {
	var db = client.db('mongol');
  	db.collection('ulan').find({}).toArray(function(err, docs){
    return docs.name == username;
  });
}


app.post('/login', function (req, res) {
  var body = req.body;

  if (body.username && body.password) {
    var db = _client.db('mongol');

    db.collection('UlanBator').find({username : body.username}).toArray(function(err, docs) {
      if (docs) {
        doc = docs[0];

        if(doc.password == body.password) {
          tokenList.push(randomToken());

          res.status(200).send({message: 'Login good', token: tokenList});
          console.log('ok')
        } else {
          res.status(412).send('Wrong password');
          }
        } 
      else {
          res.status(404).send('This username does not exist'); 
        }
    });
  } else {
    res.status(412).send('Wrong username');
  }
});







MongoClient.connect(url, function (err, client) {

  if (err) console.log('Erro! ', err);
  else {
    console.log("Connected successfully to server");

    app.listen(3000, function () {
      console.log('Listening on port 3000');
      });

    _client = client;

    
  }
});