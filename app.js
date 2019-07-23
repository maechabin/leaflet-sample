const mymap = L.map('mapid').setView(
  [35.69432984468491, 139.74267643565133],
  12,
);

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets', // mapbox.streets | mapbox.satellite
    accessToken: 'your.mapbox.access.token',
  },
).addTo(mymap);

/**
 * Icon
 * https://leafletjs.com/reference.html#icon
 */
const greenIcon = L.icon({
  iconUrl: './images/leaf-green.png',
  shadowUrl: './images/leaf-shadow.png',

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

// Icon Class としても定義可能
const LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: './images/leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});
const redIcon = new LeafIcon({ iconUrl: './images/leaf-red.png' });

/**
 * Marker
 */
const marker1 = L.marker([35.67932984468491, 139.76267643565133]).addTo(mymap);
const marker2 = L.marker([35.69432984468491, 139.74267643565133], {
  icon: greenIcon,
}).addTo(mymap);
const marker3 = L.marker([35.65924891619007, 139.68429565429688], {
  icon: redIcon,
}).addTo(mymap);

// Popup (デフォルトで表示)
marker1.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
// Popup (クリックで表示)
marker2.bindPopup('<b>Hello world!</b><br>I am a popup and custom icon');
// Popup (クリックで表示)
marker3.bindPopup('<b>Hello world!</b><br>I am a popup and custom icon.');

/**
 * Circle
 */
const circle = L.circle([35.69953148584311, 139.69781036376953], {
  color: '#904',
  fillColor: '#c29',
  fillOpacity: 0.6,
  radius: 1500,
}).addTo(mymap);

// Popup
circle.bindPopup('I am a circle.');

/**
 * Polygon
 */
const polygon = L.polygon([
  [35.69432984468491, 139.74267643565133],
  [35.65924891619007, 139.68429565429688],
  [35.69953148584311, 139.69781036376953],
]).addTo(mymap);

// Pupup
polygon.bindPopup('I am a polygon.');

/**
 * Popup
 */
const popup1 = L.popup()
  .setLatLng([35.65432984468491, 139.74267643565133])
  .setContent('I am a standalone popup.')
  .openOn(mymap);

/**
 * Event
 */
const popup2 = L.popup();

function onMapClick(e) {
  popup2
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);

/**
 * GeoJSON
 * types: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection'
 */
const someFeatures = [
  {
    type: 'Feature',
    properties: {
      name: 'Coors Field',
      show_on_map: true,
    },
    geometry: {
      type: 'Point',
      coordinates: [139.73267643565133, 35.63432984468491],
    },
  },
  {
    type: 'Feature',
    properties: {
      name: 'Busch Field',
      show_on_map: true,
    },
    geometry: {
      type: 'Point',
      coordinates: [139.75267643565133, 35.6332984468491],
    },
  },
];

L.geoJSON(someFeatures, {
  filter(feature, layer) {
    console.log(feature);
    return feature.properties.show_on_map;
  },
}).addTo(mymap);

/**
 * Custom Control
 */
const info = L.control();

info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function(props) {
  this._div.innerHTML =
    `<h4>Population Density</h4>` +
    (props
      ? `
        <b>${props.name}</b><br />
        ${props.density} people / mi<sup>2</sup>
      `
      : `Hover over a state`);
};

info.addTo(mymap);
info.update({
  name: 'Tokyo',
  density: '6,309.78',
});

/**
 * Interactive Choropleth Map (インタラクティブな階級区分図)
 */
console.log(statesData);
const geojson = L.geoJson(statesData).addTo(mymap);
