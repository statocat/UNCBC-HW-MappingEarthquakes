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
  layers:[satelliteStreets]
});

// Create controller to select map style option
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json( "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into a function
  // to calculate the radius.
  function styleInfo(feature) {
      return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: getColor(feature.properties.mag),
          color: "#000000",
          radius: getRadius(feature.properties.mag),
          stroke: true,
          weight: 0.5
  };
}
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(mag) {
    if (mag === 0) {
    return 1;
    }
    return mag * 4;
    }

    // This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
          console.log(data);
          return L.circleMarker(latlng);
          },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    
    // add popup
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>" + "Location: " + feature.properties.place);
    }
      }).addTo(map);
});


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
