function addMarker(name, map, latitude, longitude) {
    var coordinates = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        id: name,
        position: coordinates,
        map: map,
    });

    google.maps.event.addListener(marker, 'click', function() {
        /*
         * TODO: open project details
         *    1. get the description for this corresponding marker
         *    2. set the text of the description window
         *    3. switch tabs
         */
        clearProjects();
        addProject(marker.id);

        var dom = $('#projects-list a[href="#"]:contains("' + marker.id + '")');

        dom.click();

        // $('#tabs a[href="#details"]').tab('show'); // Select tab by name
    });
    
    return marker;
}

function removeMarker(marker) {
    marker.setMap(null);
}

function getCoords(state, country) {
    var geocoder = new google.maps.Geocoder();
    var address = state + ', ' + country;

    if (geocoder) {
        geocoder.geocode({'address' : address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log(results[0].geometry.location);
            } else {
                console.log('Geocoding failed: ' + status);
            }
        });
    }
}

function getState(coordinates) {
    if (selectedType !== 'state') {
        return;
    }

    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'latLng': coordinates }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var address = results[1].formatted_address.split(", ");
            var state = address[address.length - 2];

            if (address[address.length - 1] === 'India') {
                if (state === 'Odisha') {
                    state = 'Orissa';
                }
                stateCallback(state);
                // getCoords(state, 'India')
            }
        }
    });
}

function stateCallback(state) {
    var dom = $('#states-list a:contains(' + state.toUpperCase() + ')');

    dom.click();
}
