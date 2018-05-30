var GJV = require("geojson-validation");

var repository = {
  features: {
    "cf2022a4-8002-4e5d-b940-22029308d8ab": {
      "type": "Feature",
      "properties": {
        "id": "cf2022a4-8002-4e5d-b940-22029308d8ab"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.14007568359375,
              51.5027589576403
            ],
            [-0.12325286865234374,
              51.5027589576403
            ],
            [-0.12325286865234374,
              51.512588580360244
            ],
            [-0.14007568359375,
              51.512588580360244
            ],
            [-0.14007568359375,
              51.5027589576403
            ]
          ]
        ]
      }
    },
    "9c9e68cd-89bc-43ef-9788-fc7fbef048d8": {
      "type": "Feature",
      "properties": {
        "id": "9c9e68cd-89bc-43ef-9788-fc7fbef048d8"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.1352691650390625,
              51.50810140697543
            ],
            [-0.11398315429687499,
              51.50810140697543
            ],
            [-0.11398315429687499,
              51.51963895991333
            ],
            [-0.1352691650390625,
              51.51963895991333
            ],
            [-0.1352691650390625,
              51.50810140697543
            ]
          ]
        ]
      }
    },
    "1ac3822d-5dd7-4090-92f9-decb34bb1ed1": {
      "type": "Feature",
      "properties": {
        "id": "1ac3822d-5dd7-4090-92f9-decb34bb1ed1"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.13595581054687497,
              51.49698840879303
            ],
            [-0.11226654052734375,
              51.49698840879303
            ],
            [-0.11226654052734375,
              51.50510971251776
            ],
            [-0.13595581054687497,
              51.50510971251776
            ],
            [-0.13595581054687497,
              51.49698840879303
            ]
          ]
        ]
      }
    }
  },
  getAll: function() {
    return {
      "type": "FeatureCollection",
      "features": Object.values(this.features)
    }
  },
  add: function(uuid, feature) {
    var featureObject = JSON.parse(feature);
    if (uuid in this.features) {
      return 409;
    }

    if (GJV.valid(featureObject)) {
      console.info("Adding feature: " + uuid);
      this.features[uuid] = featureObject;
      return 201;
    } else {
      console.error("Invalid feature: (" + uuid + "): '" + feature + "'");
      return 400;
    }
  },
  delete: function(uuid) {
    console.info("Deleting feature: " + uuid);
    delete this.features[uuid];
  }
}

module.exports = repository;
