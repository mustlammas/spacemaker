var sqlite = require('sqlite-sync');
const GJV = require("geojson-validation");

function getAllFeatures() {
  sqlite.connect('./features.db');
  var rows = sqlite.run("SELECT json FROM features");
  var features = [];
  for (var i in rows) {
    features.push(JSON.parse(rows[i].json));
  }
  sqlite.close();
  return features;
}

function exists(uuid) {
  sqlite.connect('./features.db');
  var rows = sqlite.run("SELECT uuid FROM features WHERE uuid = ?", [uuid]);
  var exists = rows && rows.length > 0;
  sqlite.close();
  return exists;
}

function addFeature(uuid, feature) {
  sqlite.connect('./features.db');
  sqlite.run("INSERT INTO features (uuid, json) VALUES (?, ?)", [uuid, feature]);
  sqlite.close();
}

function deleteFeature(uuid) {
  sqlite.connect('./features.db');
  sqlite.run("DELETE FROM features WHERE uuid = ?", [uuid]);
  sqlite.close();
}

var repository = {
  getAll: function() {
    return {
      "type": "FeatureCollection",
      "features": getAllFeatures()
    }
  },

  add: function(uuid, feature) {
    var featureObject = JSON.parse(feature);
    if (exists(uuid)) {
      return 409;
    }

    if (GJV.valid(featureObject)) {
      console.info("Adding feature: " + uuid);
      addFeature(uuid, feature);
      return 201;
    } else {
      console.error("Invalid feature: (" + uuid + "): '" + feature + "'");
      return 400;
    }
  },

  delete: function(uuid) {
    console.info("Deleting feature: " + uuid);
    deleteFeature(uuid);
  }
}

module.exports = repository;
