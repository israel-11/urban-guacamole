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

  con.query('SELECT * from groups', function(err, rows) {
    con.end();
      if(!err)
        res.send(rows);
      else {
        console.log('Error while performing Query.');
      }
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
  con.query('SELECT groupsId, groupName, groupSize, groupCapacity, courseId FROM groups NATURAL JOIN pertains NATURAL JOIN student WHERE studentId=' + id,function(err,rows){
    if(err) throw err;
    var finalData = [];
    if (rows.length > 0) {
      var groupIds = rows.map(function(group){
        var format =
                      {
                        'groupId':'',
                        'groupName':'',
                        'groupSize':'',
                        'groupCapacity':'',
                        'courseId':'',
                        'members':[]
                      };
        format.groupId = group.groupsId;
        format.groupName = group.groupName;
        format.groupSize = group.groupSize;
        format.groupCapacity = group.groupCapacity;
        format.courseId = group.courseId;
        finalData.push(format);
        return group.groupsId;
      });
      var iterations = 0;
      groupIds.map(function(id){
        con.query('SELECT userFirstName, userLastName, userImage FROM user NATURAL JOIN student NATURAL JOIN pertains NATURAL JOIN groups WHERE groupsId=' + id, function(error, rows){
          if(error) throw error;

          //Retrieve ids of this monster
          var ids = finalData.map(function(group){
            return group.groupId;
          })

          var idx = ids.indexOf(id);
          rows.map(function(student){
            finalData[idx].members.push(student);
          });
          iterations++;
          if(iterations==groupIds.length) {
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

exports.findGroupStudents = function(req, res) {
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

  con.query('SELECT * from groups natural join students where groupId=' + id, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log('Error while performing Query.');
      }
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

  con.query('SELECT groupName, userFirstName, userLastName, userImage, body FROM groups NATURAL JOIN groupMessages NATURAL JOIN pertains, user WHERE userId=senderId AND studentId=' + id, function(err, result) {
    con.end();
      if(!err)
        console.log("");
      else {
        console.log(err);
      }
      res.send(result);
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

exports.leave = function(req, res) {
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

  var sid = req.body.studentId;
  var gid = req.body.groupsId;

  con.query('DELETE FROM pertains WHERE studentId=' + sid + ' AND groupsId=' + gid, function(err, result) {
    if(!err) {
      console.log("");
      con.query('UPDATE groups SET groupSize = groupSize-1 WHERE groupsId=' + gid, function(err, result) {
        if (!err) {
          console.log("");
          con.query('SELECT groupSize FROM groups WHERE groupsId=' + gid, function(err, result) {
            if (!err) {
              console.log("");
              var size = result.map(function(group) {
                return group.groupSize;
              })
              if (size[0] == 0) {
                con.query('DELETE FROM groups WHERE groupsId=' + gid, function(err, result) {
                  con.end();
                  if (!err) {
                    console.log("");
                  }
                  else {
                    console.log(err);
                  }
                });
              }
            }
            else {
              console.log(err);
            }
          });
        }
        else
          console.log(err);
      });
    }
    else {
      console.log(err);
    }
    res.send(result);
  });
};

exports.createGroup = function(req, res) {
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

  var cid = req.body.courseId;
  var gname = req.body.groupName;
  var gcapacity = req.body.groupCapacity;
  var sid = req.body.studentId;

  con.query('INSERT INTO groups(courseId, groupName, groupSize, groupCapacity) VALUES(' + cid + ', ' + gname + ', 1, ' + gcapacity + ')', function(err, result) {
    if(!err) {
      console.log("");
      con.query('SELECT groupsId FROM groups WHERE courseId=' + cid + ' AND groupName=' + gname + ' AND groupSize=1 AND groupCapacity=' + gcapacity, function(err, result){
        if (!err) {
          var id = result.map(function(group) {
            return group.groupsId;
          });
          console.log(id[0]);
          var gid = id[0];

          con.query('INSERT INTO pertains(studentId, groupsId) VALUES(' + sid + ', ' + gid + ')', function(err, result) {
            con.end();
            if(!err)
              console.log("");
            else {
              console.log(err);
            }
          })
        }
        else {
          console.log(err);
        }
      });
    }
    else {
      console.log(err);
    }
    res.send(result);
  });
};

exports.joinGroup = function(req, res) {
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

  req.body.map(function(group) {
    var sid = group.studentId;
    var gid = group.groupsId;

    con.query('INSERT INTO pertains(studentId, groupsId) VALUES(' + sid + ', ' + gid + ')', function(err, result) {
      if(!err) {
        console.log("");
        con.query('UPDATE groups SET groupSize = groupSize + 1 WHERE groupsId=' + gid, function(err, result) {
          if (!err){
            console.log("");
          }
          else {
            console.log(err);
          }
        })
      }
      else {
        console.log(err);
      }
      res.send(result);
    });
    if(iterations == req.body.length)
      con.end();
    else
      iterations++;
  });

};
