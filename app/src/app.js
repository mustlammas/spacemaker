var express = require('express');
var app = express();

var FeatureController = require('./FeatureController');
app.use('/api/v1/features', FeatureController);

module.exports = app;
