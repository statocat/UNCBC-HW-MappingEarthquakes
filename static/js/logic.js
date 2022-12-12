// Add console.log to check to see if our code is working.
console.log("working");

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"14",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Create the map object with a center and zoom level.
// center on USA
// let map = L.map('mapid').setView([40.7, -94.5], 4);

// center on SFO airport
let map = L.map('mapid').setView([37.6199,-122.375], 10);

// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// Add a marker to the map for LA,CA
// let marker = L.marker([34.0522,-118.2437]).addTo(map)

// Add circle marker to the map for LA,CA
// L.circle([34.0522,-118.2437], {
//     radius:300,
//     color: 'black',
//     fillColor: 'yellow',
//     fillOpacity: 0.2
// }).addTo(map);


//  Add circle marker using circleMarker function

// L.circleMarker([34.0522,-118.2437], {
//     radius: 300,
//     color: 'black',
//     fillColor: '#ffffa1',
// }).addTo(map);

// add geoJSON feature to map
// L.geoJSON(sanFranAirport).addTo(map);

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng).bindPopup("<h2>" + feature.properties.name + "</h2>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>")
//     }}).addTo(map);

// onEachFeature fxn
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup();
     }
});
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);