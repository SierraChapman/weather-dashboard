$(document).ready(function () {

    function displayCurrentWeather(cityName) {

        // Request current weather conditions (minus UV Index)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=e97fecefd6f8473cda5766ca71e143de&units=imperial";
    
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
        })

        // Display current date

        // Display UV Index


    }    

    displayCurrentWeather("Pleasanton");

});