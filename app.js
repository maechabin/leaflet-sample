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
    id: 'mapbox.satellite', // mapbox.streets
    accessToken: 'your.mapbox.access.token',
  },
).addTo(mymap);

/**
 * Marker
 */
const marker1 = L.marker([35.69432984468491, 139.74267643565133]).addTo(mymap);
const marker2 = L.marker([35.65924891619007, 139.68429565429688]).addTo(mymap);

// Popup (デフォルトで表示)
marker1.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
// Popup (クリックで表示)
marker2.bindPopup('<b>Hello world!</b><br>I am a popup.');

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
