// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


var myMap = L.map("map", {
  center: [
    39.701804, -107.335557   
  ],
  zoom: 5
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);
  ""

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
    weight: 0.4,
    fillColor: getColor(feature[i].properties.mag),
    // Adjust radius
    radius: feature[i].properties.mag * 20000
  }).bindPopup("<h1>" + feature[i].properties.place + "</h1> <hr> <h3>Magnitude: " + feature[i].properties.mag + 
  "</h3>" + "<h3> Date/Time: " + new Date(feature[i].properties.time).toJSON() + "</h3>" +  
  "<h3> Significance (1-1000): " + feature[i].properties.sig + "</h3>")
    .addTo(myMap);

}

});


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' + 
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join("<br>");
    return div;
};

legend.addTo(myMap);


 

