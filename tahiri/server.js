var express = require('express');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json

require('./routes')(app);

var port = process.env.PORT || 8080;
console.log("listening in port: "+port);
app.listen(port);
