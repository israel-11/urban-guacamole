var dataArray=[];
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

  con.query('SELECT * from course', function(err, rows) {
    con.end();
      if(!err)
        res.send(rows);
      else {
        console.log('Error while performing Query.');
      }
    });

};

exports.findByStudent = function(req, res) {
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
  con.query('SELECT courseId, courseName, courseCode FROM course NATURAL JOIN takes NATURAL JOIN student WHERE studentId=' + id,function(err,rows){
    if(err) throw err;
    var finalData = [];
  if (rows.length > 0) {
    var courseIds = rows.map(function(course){
      var format =
                    {
                     'courseId':'',
                     'courseName':'',
                     'courseCode':'',
                     'tutors':[]
                   };
      format.courseId = course.courseId;
      format.courseName = course.courseName;
      format.courseCode = course.courseCode;
      finalData.push(format);
      return course.courseId;
    });
    var iterations = 0;
    courseIds.map(function(id){
      con.query('SELECT tutorId, userFirstName, userLastName, userImage FROM user NATURAL JOIN tutor NATURAL JOIN teaches NATURAL JOIN course WHERE available=1 AND courseId=' + id, function(error, rows){
        if(error) throw error;

        //Retrieve ids of this monster
        var ids = finalData.map(function(course){
          return course.courseId;
        })

        var idx = ids.indexOf(id);
        rows.map(function(tutor){
          finalData[idx].tutors.push(tutor);
        });
        iterations++;
        if(iterations==courseIds.length) {
          res.send(finalData);
          con.end();
        }
      });
    });
  }
  else {
    res.send(rows);
    con.end();
  }
  });
};

exports.findByTutor = function(req, res) {
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

  con.query('SELECT * from courses natural join tutor where tutorId=' + id, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log('Error while performing Query.');
      }

    });

};
