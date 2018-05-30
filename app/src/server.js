var express = require('express');
var connect = require('connect');
var serveStatic = require('serve-static');
const sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var express = require('express');
var FeatureController = require('./FeatureController');

const PORT = 3000;

var app = express();
app.use('/api/v1/features', FeatureController);
app.use(express.static('./src/public'));
var server = app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});
