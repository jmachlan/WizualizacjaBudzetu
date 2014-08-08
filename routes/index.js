var express = require('express');
var router = express.Router();
var csvParser = require('../csvParser');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res){
  console.log(config.MONGO);
  var html = '<form method="post" enctype="multipart/form-data" action="/user">'+
      '<label for="username"><span>login</span><input type="text" name="username" id="username"></label><br/>'+
      '<label for="password"><span>hasło</span><input type="password" name="password" id="password"></label><br/><br/>'+
      '<input type="submit" value="KLIK">'+
      '</form>';
               
  res.send(html);
});

router.post('/user', function(req, res) {
  if (req.body.username != 'admin' || req.body.password != 'admin123') {
    var aaa = req.body.username;
    var bbb = req.body.password;
    res.send("<div>Wprowadzono błędne dane.</div><div><a href='/'>powrót</a></div>");
  } else {
    var html = '<form method="post" enctype="multipart/form-data" action="/file-upload">'+
        '<label for="inputcsv"><span>wprowadź plik</span><input type="file" name="inputcsv" id="inputcsv"></label><br/><br/>'+
        '<input type="submit" value="KLIK">'+
        '</form>';
    
    res.send(html);
  }
});

router.post('/file-upload', function(req, res) {
  
  //var filepath = "/usr/home/aplikacje/domains/test.aplikacje.mydevil.net/public_nodejs/"; 
  //var filepath = "/usr/home/aplikacje/domains/test.aplikacje.mydevil.net/public_nodejs/" + req.files.inputxml.path;
  //name = "" || ;
  res.send("<div>Poprawnie zuploadowano plik</div><div><a href='/'>powrót</a></div>");
  process.stderr.write("DEBUG Invoking callback function\n");
  process.nextTick(invokeParser(req.files.inputcsv.path));
});

var invokeParser = function(path){
  return function() {
    process.stderr.write("DEBUG " + path + "\n");
    process.stderr.write("Invoking parser...\n");
    csvParser.parse(path);
  }
}

module.exports = router;