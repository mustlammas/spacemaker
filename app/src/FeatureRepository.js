var repository = {
    features: [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -0.14007568359375,
                    51.5027589576403
                  ],
                  [
                    -0.12325286865234374,
                    51.5027589576403
                  ],
                  [
                    -0.12325286865234374,
                    51.512588580360244
                  ],
                  [
                    -0.14007568359375,
                    51.512588580360244
                  ],
                  [
                    -0.14007568359375,
                    51.5027589576403
                  ]
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -0.1352691650390625,
                    51.50810140697543
                  ],
                  [
                    -0.11398315429687499,
                    51.50810140697543
                  ],
                  [
                    -0.11398315429687499,
                    51.51963895991333
                  ],
                  [
                    -0.1352691650390625,
                    51.51963895991333
                  ],
                  [
                    -0.1352691650390625,
                    51.50810140697543
                  ]
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -0.13595581054687497,
                    51.49698840879303
                  ],
                  [
                    -0.11226654052734375,
                    51.49698840879303
                  ],
                  [
                    -0.11226654052734375,
                    51.50510971251776
                  ],
                  [
                    -0.13595581054687497,
                    51.50510971251776
                  ],
                  [
                    -0.13595581054687497,
                    51.49698840879303
                  ]
                ]
              ]
            }
          }
  ],
    getAll: function() {
      return {
          "type": "FeatureCollection",
          "features": this.features
      }
    }
}

module.exports = repository;
