var express = require('express');
var bodyParser = require('body-parser');
var FeatureRepository = require('./FeatureRepository');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
  res.status(200).send(FeatureRepository.getAll());
});

router.post('/:uuid', function (req, res) {
  var uuid = req.params.uuid;
  var json = req.body.json;
  var statusCode = FeatureRepository.add(uuid, json);
  if (statusCode === 201) {
    res.status(statusCode).send(uuid);
  } else {
    res.status(statusCode);
  }
});

router.delete('/:uuid', function (req, res) {
  var uuid = req.params.uuid;
  FeatureRepository.delete(uuid);
  res.status(200).send(uuid);
});

module.exports = router;
