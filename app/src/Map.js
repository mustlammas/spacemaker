var jQuery = require("jquery");
var React = require('react');
var turf = require('turf');

var ol_Map = require('ol/map').default;
var ol_layer_Tile = require('ol/layer/tile').default;
var ol_source_OSM = require('ol/source/osm').default;
var ol_source_Vector = require('ol/source/vector').default;
var ol_layer_Vector = require('ol/layer/vector').default;
var ol_View = require('ol/view').default;
var ol_Proj = require('ol/proj').default;
var ol_format_GeoJSON = require('ol/format/GeoJSON').default;
var ol_interaction_Select = require('ol/interaction/Select').default;

var WEB_MERCATOR = 'EPSG:3857';
var WGS84 = 'EPSG:4326';
var center = [-0.13, 51.51];

function getUnion(features) {
  var geoJsonFeatures = new ol_format_GeoJSON().writeFeatures(features, {
    featureProjection: WEB_MERCATOR,
    dataProjection: WGS84
  });
  var geoJsonObject = JSON.parse(geoJsonFeatures);

  var union;
  for (var i in geoJsonObject.features) {
    var feature = geoJsonObject.features[i];
    union = union ? turf.union(union, feature) : feature;
  }
  return union;
}

function getIntersection(polygonA, polygonB) {
  return turf.intersect(polygonA, polygonB);
}

var selectedFeatures;
var map;
var vectorSource;

class Map extends React.Component {
  componentDidMount() {
    vectorSource = new ol_source_Vector();
    var vectorLayer = new ol_layer_Vector({
      title: 'Polygon layer',
      source: vectorSource
    });

    map = new ol_Map({
      target: 'map',
      layers: [
        new ol_layer_Tile({
          source: new ol_source_OSM()
        })
      ],
      view: new ol_View({
        center: ol_Proj.transform(center, WGS84, WEB_MERCATOR),
        zoom: 13
      })
    });

    var select = new ol_interaction_Select();
    selectedFeatures = select.getFeatures();
    map.addInteraction(select);

    jQuery.getJSON("features.json", null, function(geoJson) {
      // TODO: load data from REST API
      var features = (new ol_format_GeoJSON({
        featureProjection: WEB_MERCATOR
      })).readFeatures(geoJson);
      vectorSource.addFeatures(features);
    });

    map.addLayer(vectorLayer);
  }

  union(e) {
    var features = selectedFeatures.getArray();
    if (features.length > 1) {
      var union = getUnion(features);
      var olFeatures = new ol_format_GeoJSON({
        featureProjection: WEB_MERCATOR,
        dataProjection: WGS84
      }).readFeatures(union);
      vectorSource.clear();
      selectedFeatures.clear();
      vectorSource.addFeatures(olFeatures);
    }
  }

  render() {
    return <button onClick={this.union}>Union</button>;
  }
}

module.exports = Map;
