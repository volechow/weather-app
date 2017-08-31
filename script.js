function showTemperature(temp, unit) {
	$( "#converter" ).text(unit);
	temp = Math.round( temp * 10 ) / 10;
	$( "#temperature" ).text(temp);
}

function convertToFahrenheit(temp) {
	temp = temp * (9/5) + 32;
	return temp;
}

function convertToCelsius(temp) {
	temp = (temp - 32) * (5/9); 
	return temp;
}

function showWeather(data) {
	$('#temperature').text(showTemperature(data.main.temp, "Celsius"))
	$('#weather').text(data.weather[0].description)
	$('#location').text(data.base)
	$('#weather-icon').html('<img src="'+data.weather[0].icon+'">')
}

function getWeatherByPosition(position) {
	var lon = position.coords.longitude;
	var lat = position.coords.latitude;
	var weatherURL = "https://fcc-weather-api.glitch.me/api/current?lon="+lon+"&lat="+lat;
	
	$.ajax({
		type: 'GET',
		url: weatherURL,
		success: function(data) {
			showWeather(data);
		}
	});
}

function getWeatherByLocation(location) {
	var appid = "a483f5ce818a715e9a60890e8a197dfe";
	var locationURL = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+appid;
	
	$.ajax({
		type: 'GET',
		url: locationURL,
		success: function(data) {
			showWeather(data);
		}
	});
}


$( document ).ready(function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByPosition);
    } else { 
        $("#location").text("Geolocation is not supported by this browser.");
    }

	$( "#converter" ).click(function() {
		var temp = 0;
		temp = $("#temperature").text();
		if ($( this ).text() === "Fahrenheit" ) {
			temp = convertToCelsius(temp);
			showTemperature(temp, "Celsius");
		}
		else if ($( this ).text() === "Celsius" ) {
			temp = convertToFahrenheit(temp);
			showTemperature(temp, "Fahrenheit");
		}
	});

	$("#search-btn").click(function() {
		var query;
		query = $("#search").val();
		console.log(query);
		getWeatherByLocation(query);
	});

	
	$("#search").keypress(function(e) {
		if(e.which == 13) {
			var query;
			query = $("#search").val();
			console.log(query);
			getWeatherByLocation(query);
		}
	});

	$("#current-btn").click(function() {
        navigator.geolocation.getCurrentPosition(getWeatherByPosition);
	});
});
