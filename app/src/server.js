var express = require('express');
var connect = require('connect');
var serveStatic = require('serve-static');
var app = require('./app');

var port = 3000;
app.use(express.static('./src/public'));
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
