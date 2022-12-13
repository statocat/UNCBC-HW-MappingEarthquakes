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
  "Streets": streets,
  'Satellite Streets': satelliteStreets
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [43.7,-79.3],
  zoom:11,
  layers:[streets]
});

// Create controller to select map style option
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/statocat/UNCBC-HW14-MappingEarthquakes/MappingGeoJSONPolygons/static/js/torontoNeighborhoods.json";

// // Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer){
      layer.bindPopup(
        "<h3> Neighborhood: "+feature.properties.AREA_NAME+"</h3>"
      )
    }
  }).addTo(map);
});

  // , 
  //   {
  //   style: myStyle,
  //   onEachFeature: function(feature, layer){
  //     layer.bindPopup("<h3> Airline: "+
  //     feature.properties.airline +
  //     "</h3> <hr> <h3> Destination: " +
  //     feature.properties.dst +
  //     "</h3>");
  //   }
  // }
