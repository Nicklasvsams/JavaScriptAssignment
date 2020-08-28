// Ensures that the DOM content has been properly loaded before running script
document.addEventListener("DOMContentLoaded", function (event) {
    // Access token for the API
    mapboxgl.accessToken = 'pk.eyJ1Ijoibmlja2xhc3ZzYW1zIiwiYSI6ImNrZWR2aTFhZzB3a3cydHA3OTdna3M2YWQifQ.aCB7Q6nsiM3BvQrCAC_8Tg';

    // Instantiation of the map
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [12.5, 55.65],
        zoom: 3
    });

    // Instantiation of the mapmarkers
    var geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-77.032, 38.913]
            },
            properties: {
                title: 'Mapbox',
                description: 'Washington, D.C.'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-122.414, 37.776]
            },
            properties: {
                title: 'Mapbox',
                description: 'San Francisco, California'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [12.34234440489667, 55.732685700000005]
            },
            properties: {
                title: 'Mapbox',
                description: "TEC Ballerup, Denmark"
            }
        }
        ]
    };

    // Creation of elements for each marker we've instantiated
    geojson.features.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el, { anchor: 'bottom' })
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 70 })
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
            .addTo(map);
    });
});