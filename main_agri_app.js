var mapView = new ol.View({
    center: ol.proj.fromLonLat([9.536133, 34.849875]),
    zoom: 7
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
});

// Base layers
var osmTile = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: true,
    type: 'base',
    source: new ol.source.OSM()
});

var noneTile = new ol.layer.Tile({
    title: 'None',
    type: 'base',
    visible: false
});

var baseGroup = new ol.layer.Group({
    title: 'Base Maps',
    fold: true,
    layers: [osmTile, noneTile]
});

map.addLayer(baseGroup);

// WMS Layer - Oliviers en Tunisie
var Olivier = new ol.layer.Tile({
    title: "Olivier",
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/cite/wms',
        params: { 'LAYERS': 'cite:Oliviers_en_Tunisie_(Superficie)', 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

map.addLayer(Olivier);

// Layer Switcher Control
var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    groupSelectStyle: 'children'
});
map.addControl(layerSwitcher);

// Mouse Position Control
var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    projection: 'EPSG:4326',
    coordinateFormat: function (coordinate) {
        return ol.coordinate.format(coordinate, '{y} , {x}', 6);
    }
});
map.addControl(mousePosition);

// Scale Line Control
var scaleControl = new ol.control.ScaleLine({
    bar: true,
    text: true
});
map.addControl(scaleControl);
