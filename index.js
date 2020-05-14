$(document).ready(function(){
	getLocation();

	
	fetch('https://ipapi.co/json/')
  		.then(response => response.json())
  		.then(function(data) {
  			var country = document.querySelector('#country');
  			var city = document.querySelector('#city');

  			country.innerText = data.country_name;
  			city.innerText = data.city;
  			
  			//console.log(data);
  		});

});


function getLocation() {
  	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(showPosition);
  	} else {
		$('#map').html('<h5 class="mt-5">Geolocation is not supported by this browser.</h5>');
	}
}

function showPosition(position) {
	// Initialize the platform object:
	var platform = new H.service.Platform({
		'apikey': '6OtoknayctHqyYvpXZKMdwjlgg6IkcNCXIwHkOmmfbk'
	});

	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	// Obtain the default map types from the platform object
	var maptypes = platform.createDefaultLayers();

	// Instantiate (and display) a map object:
	var map = new H.Map(document.getElementById('map'), maptypes.vector.normal.map,{
		zoom: 10,
		center: { lng: longitude, lat: latitude }
	});

	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
	//var mapEvents = new H.mapevents.MapEvents(map);

	// Create the default UI:
	var ui = H.ui.UI.createDefault(map, maptypes);

	// Using google icons
	// Icons list = http://kml4earth.appspot.com/icons.html
	var marker = 'http://maps.google.com/mapfiles/kml/paddle/ltblu-blank.png';
	var icon = new H.map.Icon(marker);
	var saved_location = new H.map.Marker({lat: latitude, lng: longitude}, { icon: icon });
	map.addObject(saved_location);
}