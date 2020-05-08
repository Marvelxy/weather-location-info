$(document).ready(function(){
	getLocation();

});


function getLocation() {
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	  } else {
			$('#map').html('<h5 class="mt-5">Geolocation is not supported by this browser.</h5>');
	    //x.innerHTML = "Geolocation is not supported by this browser.";
	  }
	}

	function showPosition(position) {
	  /*x.innerHTML = "Latitude: " + position.coords.latitude +
	  "<br>Longitude: " + position.coords.longitude;*/

		// Initialize the platform object:
		var platform = new H.service.Platform({
			'apikey': '6OtoknayctHqyYvpXZKMdwjlgg6IkcNCXIwHkOmmfbk'
		});


		// Obtain the default map types from the platform object
		var maptypes = platform.createDefaultLayers();

		// Instantiate (and display) a map object:
		var map = new H.Map(document.getElementById('map'), maptypes.vector.normal.map,{
			zoom: 10,
			center: { lng: position.coords.longitude, lat: position.coords.latitude }
		});

		var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
		//var mapEvents = new H.mapevents.MapEvents(map);

		// Create the default UI:
		var ui = H.ui.UI.createDefault(map, maptypes);
	}