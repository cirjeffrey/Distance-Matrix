var origin, destination;
function initAutocomplete() {
  // Create the search box and link it to the UI element.
  var input = document.getElementById("origin");
  var searchBox = new google.maps.places.SearchBox(input);
  var dest = document.getElementById("destination");
  var destBox = new google.maps.places.SearchBox(dest);
  searchBox.addListener("places_changed", function () {
    var places = searchBox.getPlaces();
    origin = places[0].formatted_address;

    if (origin.length == 0) {
      return;
    }
  });

  destBox.addListener("places_changed", function () {
    var places2 = destBox.getPlaces();
    destination = places2[0].formatted_address;

    console.log(places2[0].formatted_address);
    if (destination.length == 0) {
      return;
    }
  });
}

function calcDistance() {
  console.log("CALCULATING");
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    },
    function (response, status) {
      if (status !== "OK") {
        alert("Error was: " + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "hi";

        var showGeocodedAddressOnMap = function (asDestination) {
          var icon = asDestination ? destinationIcon : originIcon;
          return function (results, status) {
            if (status === "OK") {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              markersArray.push(
                new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: icon,
                })
              );
            } else {
              alert("Geocode was not successful due to: " + status);
            }
          };
        };

        console.log("RESPONSE: " + response.rows[0].elements[0].distance.text);

        outputDiv.innerHTML = response.rows[0].elements[0].distance.text;
        outputDiv.style.display = "block";
      }
    }
  );
}
