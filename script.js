$(document).ready(function () {

    function displayCurrentWeather(cityName) {

        // Request current weather conditions (minus UV Index)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=e97fecefd6f8473cda5766ca71e143de&units=imperial&q=" + cityName;
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Display city name
            $("#city-name").text(response.name);
            // Display weather conditions
            $("#current-weather").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            $("#current-weather").attr("alt", response.weather[0].description)
            // Display temperature
            $("#current-temp").text(response.main.temp);
            // Display humidity
            $("#current-humidity").text(response.main.humidity);
            // Display wind speed
            $("#current-wind").text(response.wind.speed);

            // UV Index request requires longitude and latitude
            // Get coordinates from current weather
            console.log(response.coord)

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=e97fecefd6f8473cda5766ca71e143de&lat=" + response.coord.lat + "&lon=" + response.coord.lon,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // Display UV index
                $("#current-UV").text(response.value);
            })
        })
    }

    // Display current date
    displayCurrentWeather("Paris");

});