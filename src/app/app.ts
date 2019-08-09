import L, { LatLng, LeafletEvent } from 'leaflet';

declare module 'leaflet' {
  interface TileLayerOptions {
    id: 'mapbox.streets' | 'mapbox.satellite';
    accessToken: string;
  }
  interface LeafletEvent {
    latlng: LatLng;
  }
}

/**
 * Layer
 */
const streetsLayer = L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets', // mapbox.streets | mapbox.satellite
    accessToken: 'your.mapbox.access.token',
  },
);
const satelliteLayer = L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.satellite', // mapbox.streets | mapbox.satellite
    accessToken: 'your.mapbox.access.token',
  },
);

/**
 * Bounds
 */
const bounds = new L.LatLngBounds([35.09432984468491, 139.04267643565133], [35.99432984468491, 139.94267643565133]);

/**
 * Map
 */
const mymap = L.map('map').setView(
  [35.69432984468491, 139.74267643565133],
  12,
).fitBounds(bounds).addLayer(streetsLayer);

/**
 * 現在地を取得ボタンを表示する
 */
mymap.locate({
  watch: true,
  enableHighAccuracy: true,
});
mymap.on('locationfound', (data: LeafletEvent) => {
  console.log(`現在地を取得しました: ${data.latlng.lat}, ${data.latlng.lng}`);
});

mymap.invalidateSize();

L.control.layers({
  street: streetsLayer,
  satellite: satelliteLayer,
}).addTo(mymap);

/**
 * Marker
 */
const marker1 = L.marker([35.67932984468491, 139.76267643565133]).addTo(mymap);

// Popup (デフォルトで表示)
marker1.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();