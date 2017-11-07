var express = require('express');
var lostcontroller = require('./controller/server');

var app = express();

app.set('view engine','ejs');

lostcontroller(app);

app.listen(10000, function()
{
  console.log("The server is running at 10000");
});
