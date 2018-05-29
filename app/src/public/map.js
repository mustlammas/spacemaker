var mapModule = function() {
    "use strict"

    var WEB_MERCATOR = 'EPSG:3857';
    var WGS84 = 'EPSG:4326';
    var centerInMapProj = ol.proj.transform([ -0.13, 51.51], WGS84, WEB_MERCATOR);

    function createMap() {
        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            controls: ol.control.defaults({
                attributionOptions: {
                    collapsible: false
                }
            }),
            view: new ol.View({
                center: centerInMapProj,
                zoom: 13
            })
        });

        return map;
    }

    function union (polygons) {
        for (var i in polygons) {
            var polygon = polygons[i];
        }
    }

    return {
        createMap: createMap,
        union: union,
        WGS84: WGS84,
        WEB_MERCATOR: WEB_MERCATOR
    }
}();