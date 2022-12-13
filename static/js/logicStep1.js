// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v12',
    accessToken: API_KEY
});

// Create the tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v12',
    accessToken: API_KEY
});

// Create map style options menu and add to map
let baseMaps = {
  'Streets': streets,
  'Satellite': satelliteStreets
};

// Create the map object with center of US and zoom level.
let map = L.map('mapid', {
  center: [39.5,-98.5],
  zoom:3,
  layers:[streets]
});

// Create controller to select map style option
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});

// // // Create a style for the lines.
// let myStyle = {
//   color: "blue",
//   weight: 1,
//   fillColor: "yellow"
// }

// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
//   L.geoJSON(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer){
//       layer.bindPopup(
//         "<h3> Neighborhood: "+feature.properties.AREA_NAME+"</h3>"
//       )
//     }
//   }).addTo(map);
// });

//   // , 
//   //   {
//   //   style: myStyle,
//   //   onEachFeature: function(feature, layer){
//   //     layer.bindPopup("<h3> Airline: "+
//   //     feature.properties.airline +
//   //     "</h3> <hr> <h3> Destination: " +
//   //     feature.properties.dst +
//   //     "</h3>");
//   //   }
//   // }
