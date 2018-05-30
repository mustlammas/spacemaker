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
  FeatureRepository.add(uuid, json);
  res.status(201).send(uuid);
});

module.exports = router;
