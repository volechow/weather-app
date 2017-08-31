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
});
