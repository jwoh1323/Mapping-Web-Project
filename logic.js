// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var myMap = L.map("map", {
  center: [
    39.701804, -107.335557   
  ],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);


  function getColor(d) {
    return d <= 1 ? '#8AFF33' :
           d <= 2  ? '#DBFF33' :
           d <= 3 ? '#FFB833' :
           d <= 4  ? '#FF8033' :
           d <= 5   ? '#FF5E33' :
           d > 5  ? '#FF3633' :
                    '#FF3633';
}

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  console.log(data)
  var feature = data.features

  for (let i = 0; i < feature.length; i++) {
    
  L.circle([feature[i].geometry.coordinates[1], feature[i].geometry.coordinates[0]], {
    fillOpacity: 0.5,
    color: "black",
    weight: 1,
    fillColor: getColor(feature[i].properties.mag),
    // Adjust radius
    radius: feature[i].properties.mag * 20000
  }).bindPopup("<h1>" + feature[i].properties.place + "</h1> <hr> <h3>Magnitude: " + feature[i].properties.mag + "</h3>" ).addTo(myMap);

}

});


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5]

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


 

