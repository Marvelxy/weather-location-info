(function() {
	getLocation();

	fetch('https://ipapi.co/json/')
  		.then(function(response){ 
  			return response.json();
  		})
  		.then(function(data) {
  			var country = document.querySelector('#country');
  			var city = document.querySelector('#city');

  			country.innerText = data.country_name;
  			city.innerText = data.city;
  		});


  	var celsius = document.querySelector('#celsius');
  	var fahrenheit = document.querySelector('#fahrenheit');

  	celsius.addEventListener('click', function(){
  		celsius.classList.add('active');
  		celsius.classList.remove('inactive');
  		fahrenheit.classList.remove('active');
  		fahrenheit.classList.add('inactive');
  		getWeatherInfo(celsius);
  	});

  	fahrenheit.addEventListener('click', function(){
  		fahrenheit.classList.add('active');
  		fahrenheit.classList.remove('inactive');
  		celsius.classList.remove('active');
  		celsius.classList.add('inactive');
  		getWeatherInfo(fahrenheit);
  	});
})();


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

	// Set location to html element as attribute
	var location = document.querySelector('#location');
	location.setAttribute("latitude", latitude);
	location.setAttribute("longitude", longitude);

	// Display the temperature
	getWeatherInfo(celsius);
}


function getWeatherInfo(unit){
	var location = document.querySelector('#location');
	var latitude = location.getAttribute("latitude");
	var longitude = location.getAttribute("longitude");

	if(unit === celsius){
		fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=a2f6008873c30f9fc60df4512ba0edc8&units=metric')
  		.then(function(response){ 
  			return response.json();
  		})
  		.then(function(data) {
  			var tempNum = document.querySelector('#number');
  			tempNum.innerText = data['main']['temp'];
  		});
	}
	else if(unit === fahrenheit){
  		fetch('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=a2f6008873c30f9fc60df4512ba0edc8&units=imperial')
  		.then(function(response){ 
  			return response.json();
  		})
  		.then(function(data) {
  			var tempNum = document.querySelector('#number');
  			tempNum.innerText = data['main']['temp'];
  		});
	}
	
}