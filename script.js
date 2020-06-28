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

            // Get coordinates from current weather and request UV index
            displayUVIndex(response.coord.lat, response.coord.lon);
        })
    }

    // Function to request and display UV Index given some coordinates
    function displayUVIndex(lat, lon) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=e97fecefd6f8473cda5766ca71e143de&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var UVIndex = response.value;
            var UVElement = $("#current-UV");

            // Display UV index
            UVElement.text(UVIndex);

            // Color-code by level.
            if (UVIndex < 2.5) {
                // Low
                UVElement.addClass("bg-success");
                // Add label for screen readers
                UVElement.append("<span class=\"sr-only\"> (low)</span>");
            } else if (UVIndex < 7.5) {
                // Moderate
                UVElement.addClass("bg-warning");
                // Add label for screen readers
                UVElement.append("<span class=\"sr-only\"> (moderate)</span>");
            } else {
                // Severe
                UVElement.addClass("bg-danger");
                UVElement.addClass("text-white");
                // Add label for screen readers
                UVElement.append("<span class=\"sr-only\"> (severe)</span>");
            }

        })
    }

    // Event listener for searching a city
    $("#search-form").on("submit", function(event) {
        event.preventDefault();
        //console.log(this);

        // Display current date
        $("#current-date").text(new Date().toLocaleDateString());

        // Display current weather
        displayCurrentWeather($("#search").val());

        // Clear searchbar
        $("#search").val("");

    })

});