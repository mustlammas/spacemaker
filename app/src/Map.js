var jQuery = require("jquery");
var React = require('react');
var turf = require('turf');
const uuidv4 = require('uuid/v4');

var ol_Map = require('ol/map').default;
var ol_layer_Tile = require('ol/layer/tile').default;
var ol_source_OSM = require('ol/source/osm').default;
var ol_source_Vector = require('ol/source/vector').default;
var ol_layer_Vector = require('ol/layer/vector').default;
var ol_View = require('ol/view').default;
var ol_Proj = require('ol/proj').default;
var ol_format_GeoJSON = require('ol/format/geojson').default;
var ol_interaction_Select = require('ol/interaction/select').default;

const WEB_MERCATOR = 'EPSG:3857';
const WGS84 = 'EPSG:4326';
const API_URL = 'api/v1/features';
const LAYER_ID = "vector-layer";

function asGeoJson(features) {
  var geoJsonFeatures = new ol_format_GeoJSON().writeFeatures(features, {
    featureProjection: WEB_MERCATOR,
    dataProjection: WGS84,
    rightHanded: true
  });
  return JSON.parse(geoJsonFeatures);
}

function createUnionFeature(features) {
  var geoJsonObject = asGeoJson(features);
  var union;
  for (var i in geoJsonObject.features) {
    var feature = geoJsonObject.features[i];
    union = union ? turf.union(union, feature) : feature;
  }
  return union;
}

function createIntersectionFeature(features) {
  var geoJsonObject = asGeoJson(features);
  if (geoJsonObject.features.length == 2) {
    return turf.intersect(geoJsonObject.features[0], geoJsonObject.features[1]);
  } else {
    throw "Can't intersect more than two polygons";
  }
}

function createMap(center) {
  var vectorSource = new ol_source_Vector();
  var vectorLayer = new ol_layer_Vector({
    title: 'Polygon layer',
    source: vectorSource,
    id: LAYER_ID
  });

  var map = new ol_Map({
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

  var selectInteraction = new ol_interaction_Select();
  map.addInteraction(selectInteraction);
  map.addLayer(vectorLayer);

  return {
    map: map,
    selectInteraction: selectInteraction
  }
}

function getVectorLayer(map) {
  var layers = map.getLayers().getArray();
  for (var i in layers) {
    var layer = layers[i];
    if (layer.get('id') === LAYER_ID) {
      return layer;
    }
  }
}

function getSelectedFeatures() {
  return selectInteraction.getFeatures().getArray();
}

function clearSelectedFeatures() {
  return selectInteraction.getFeatures().clear();
}

function removeFeature(map, feature) {
  getVectorLayer(map).getSource().removeFeature(feature);
}

function addFeatures(map, features) {
  getVectorLayer(map).getSource().addFeatures(features);
}

function clearMap(map) {
  getVectorLayer(map).getSource().clear();
  clearSelectedFeatures();
}

function updateMap(map) {
  jQuery.getJSON(API_URL, null, function(geoJson) {
    var features = (new ol_format_GeoJSON({
      featureProjection: WEB_MERCATOR
    })).readFeatures(geoJson);
    clearMap(map);
    addFeatures(map, features);
  });
}

function postFeature(feature) {
  var uuid = uuidv4();
  feature.properties.id = uuid;
  var url = API_URL + '/' + uuid;
  var success = function(data) {
    console.log("Feature saved successfully.");
  };
  var data = {
    json: JSON.stringify(feature)
  };
  jQuery.post(url, data, success, 'json');
}

function deleteFeature(feature) {
  var uuid = feature.getProperties()["id"];
  jQuery.ajax({
    url: API_URL + '/' + uuid,
    type: 'DELETE',
    success: function(result) {
      console.info("Feature deleted: " + uuid)
    }
  });
}

function updateRepository(features, newFeature) {
  postFeature(newFeature);
  for (var i in features) {
    deleteFeature(features[i]);
  }
}

var map;
var selectInteraction;

class Map extends React.Component {
  componentDidMount() {
    var createdMap = createMap([-0.13, 51.51]);
    map = createdMap.map;
    selectInteraction = createdMap.selectInteraction;

    jQuery.getJSON(API_URL, null, function(geoJson) {
      var features = (new ol_format_GeoJSON({
        featureProjection: WEB_MERCATOR
      })).readFeatures(geoJson);
      addFeatures(map, features);
    });
  }

  union() {
    var features = getSelectedFeatures();
    if (features.length > 1) {
      var union = createUnionFeature(features);
      updateRepository(features, union);
      updateMap(map);
    }
  }

  intersect() {
    var features = getSelectedFeatures();
    if (features.length > 1) {
      var intersection = createIntersectionFeature(features);
      updateRepository(features, intersection);
      updateMap(map);
    }
  }

  render() {
    return <div>
             <button onClick={this.union}>Union</button>
             <button onClick={this.intersect}>Intersect</button>
           </div>;
  }
}

module.exports = Map;
