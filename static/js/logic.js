// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v12',
    accessToken: API_KEY
});

// Create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v11',
    accessToken: API_KEY
});

// Create map style options menu and add to map
let baseMaps = {
  Street: streets,
  Dark: dark
}

// Create the map object with center and zoom level.
let map = L.map('mapid').setView([30, 30], 2);

// Create controller to select map style option
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/statocat/UNCBC-HW14-MappingEarthquakes/MappingGeoJSONPoints/static/js/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    onEachFeature: function(feature, layer){
      layer.bindPopup("<h2>" + 
      "Airport Code: "+
      feature.properties.faa +
      "</h2> <hr> <h3>Airport Name: " +
      feature.properties.name +
      "</h3>");
    }
  }).addTo(map)
}); 

// // Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

airportData