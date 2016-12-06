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

  con.query('SELECT * from tutor NATURAL JOIN user', function(err, rows) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(rows);
    });

};

exports.findCourses = function(req, res) {
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

  con.query('SELECT * from course natural join tutor natural join teaches where tutorId=' + id, function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(result);
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

  con.query('SELECT userFirstName, userLastName, userImage, title, body FROM message NATURAL JOIN student NATURAL JOIN user WHERE tutorId=' + id, function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log(err);
      }
      res.send(result);
    });

};

exports.findInfo = function(req, res) {
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

  con.query('SELECT * FROM user NATURAL JOIN tutor WHERE userId=' + id, function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log(err);
      }
      res.send(result);
    });

};

exports.availability = function(req, res) {
  console.log("updating...");
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

  var tid = req.body.tutorId;
  var cid = req.body.courseId;
  var availability = req.body.availability;
  var bool;
  if(availability==='Available'){
    bool = 1;
  }
  else{
    bool = 0;
  }
  console.log(bool);
  con.query('UPDATE teaches SET available='+ bool + ' WHERE tutorId=' + tid + ' AND courseId=' + cid, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log(err);
      }
    });
};

exports.remove = function(req, res) {
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

  // console.log(req.body);
  // res.send(req.body);

  var tid = req.body.tutorId;
  var cid = req.body.courseId;
  console.log(tid)
  console.log(cid)

  con.query('DELETE FROM teaches WHERE tutorId=' + tid + ' AND courseId=' + cid, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log('Error while performing Query.');
      }
    });
};

exports.newCourses = function(req, res) {
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

  var iterations = 0;

  req.body.map(function(course) {
    var tid = course.tutorId;
    var cid = course.courseId;

    con.query('INSERT INTO teaches(tutorId, courseId, availability) VALUES(' + tid + ', ' + cid + ', 1)', function(err, result) {
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(result);
    });
    if (iterations == req.body.length) {
      con.end();
    }
    else {
      iterations++;
    }

  });

};
