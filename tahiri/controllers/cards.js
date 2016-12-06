exports.findById = function(req, res) {
  var mysql = require('mysql');

  // First you need to create a connection to the db
  var con = mysql.createConnection({
    host: "mysql4.gear.host",
    user: "icom5016",
    password: "Yp5Sen~8XA_9",
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

  con.query('SELECT * from user natural join card where userId=' + id, function(err, result) {
    con.end();
      if(!err)
        res.send(result);
      else {
        console.log('Error while performing Query.');
      }
    });

};
