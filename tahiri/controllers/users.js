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

  con.query('SELECT * from user', function(err, rows) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(rows);
    });

};

exports.findById = function(req, res) {
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

  con.query('SELECT * from user where userId=' + id, function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(result);
    });

};

//
exports.createUser = function(req, res) {
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

  //Attributes
  var userFirstName = req.body.userFirstName
  userLastName = req.body.userLastName
  userImage = req.body.userImage
  userEmail = req.body.userEmail
  userPassword = req.body.password
  isTutor = req.body.isTutor
  userStatus = req.body.userStatus

  con.query("INSERT INTO user (userFirstName, userLastName, userImage, userEmail,"
  +"userPassword,isTutor,userStatus) VALUES('" + userFirstName + "','" +  userLastName + "','"
  + userImage + "','" + userPassword + "','" + isTutor + "','" + userStatus "')", function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log('Error while performing Query.');
      }
      res.send(result);
    });

};
//

// exports.newPost = function(req, res) {
//   var mysql = require('mysql');
//
//   // First you need to create a connection to the db
//   var con = mysql.createConnection({
//     host: "mysql4.gear.host",
//     user: "icom5016",
//     password: "Yk8Hp?sFX0-V",
//     database: "icom5016"
//   });
//
//   con.connect(function(err){
//     if(err){
//       console.log('Error connecting to Db');
//       return;
//     }
//     console.log('Connection established');
//
//   });
//
//   console.log(req.body);
//   res.send(req.body);
//
//   con.end();
//
//   // con.query('SELECT * from user where userId=' + id, function(err, result) {
//   //   con.end();
//   //     if(!err)
//   //       console.log("");
//   //     else {
//   //       console.log('Error while performing Query.');
//   //     }
//   //     res.send(result);
//   //   });
// };

exports.newUser = function(req, res) {
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

  console.log(req.body);
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

exports.reply = function(req, res) {
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

  console.log(req.body);
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

exports.getId = function(req, res) {
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

  var email = req.body.email;
  // console.log(req.body);
  // res.send(req.body);

  console.log("Este es mi email!!!" + req.body.email);

  con.query("SELECT userId, isTutor FROM user WHERE userEmail=" + req.body.email, function(err, result) {
    if(!err) {
      console.log("");
      result.map(function(user) {
        var userId = user.userId;
        var isTutor = user.isTutor;

        if (isTutor == 0) {
          con.query('SELECT studentId FROM user NATURAL JOIN student WHERE userId=' + userId, function(err, result) {
            con.end();
            if(!err) {
              //console.log("");
              res.send(result);
            }
            else {
              console.log(err);
            }
          });
        }
        else if (isTutor == 1) {
          con.query('SELECT tutorId FROM user NATURAL JOIN tutor WHERE userId=' + userId, function(err, result) {
            con.end();
            if(!err) {
              console.log("");
              res.send(result);
            }
            else
              console.log(err);
          });
        }

      });
    }
    else {
      console.log(err);
    }
  });
};
