exports.findAll = function(req, res) {

  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yk8Hp?sFX0-V",
    database: "icom5016"
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  con.query('SELECT * from student', function(err, rows) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(rows);
    });

};

exports.findMessages = function(req, res) {
  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yk8Hp?sFX0-V",
    database: "icom5016"
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  var id = req.params.id;

  con.query('SELECT userFirstName, userLastName, userImage, title, body FROM message NATURAL JOIN tutor NATURAL JOIN user WHERE studentId=' + id, function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log(err);
      }
      res.send(result);
    });

};

exports.findCountdown = function(req, res) {
  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yk8Hp?sFX0-V",
    database: "icom5016"
  });

  con.connect(function(err){
    if(err){
      console.log(err);
      return;
    }
    console.log('Connection established');
  });

  var id = req.params.id;

  con.query('SELECT title, time from countdown NATURAL JOIN student where studentId=' + id, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log(err);
      }
    });
};

exports.findInfoById = function(req, res) {
  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yk8Hp?sFX0-V",
    database: "icom5016"
  });

  con.connect(function(err){
    if(err){
      console.log(err);
      return;
    }
    console.log('Connection established');
  });

  var id = req.params.id;

  con.query('SELECT * from user NATURAL JOIN student where userId=' + id, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log('Error while performing Query.');
      }
    });
};

exports.newCountdown = function(req, res) {
  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yk8Hp?sFX0-V",
    database: "icom5016"
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');

  });

  var countId = req.body.countdownId;
  var date = req.body.newTime;
  var newTitle = req.body.newTitle;
  var query = "UPDATE countdown SET time='" + date + "', title='" + newTitle + "' WHERE countdownId=" + countId;
  console.log("query: "+query);
  con.query("UPDATE countdown SET time='" + date + "', title='" + newTitle + "' WHERE countdownId=" + countId, function(err, result) {
    con.end();
      console.log("Salio esto: "+JSON.stringify(req.body));
      if(!err)
        res.send(result);
      else {
        console.log(err);
      }
    });
};

exports.sendMessage = function(req, res) {
  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yk8Hp?sFX0-V",
    database: "icom5016"
  });

  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');

  });

  res.send(req.body);

  con.end();

  // con.query('SELECT * from user where userId=' + id, function(err, result) {
  //   con.end();
  //     if(!err)
  //       console.log("");
  //     else {
  //       console.log('Error while performing Query.');
  //     }
  //     res.send(result);
  //   });
};
