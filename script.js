$(document).ready(function () {

    // CREATE FUNCTION TO CONVERT UNIX TIME TO REGULAR
    function formatDate(unixTimestamp, timezone) {
        // Create date object with timezone adjustment
        var date = new Date((unixTimestamp + timezone) * 1000);

        //console.log(date.toUTCString());

        // Use UTC functions to prevent automatic conversion to user's timezone
        // Add 1 to month because it's indexed from zero
        return (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
    }

    function selectForecasts(allForecasts) {
        // Currently, this function selects 1 forecast per day that is close to the current time
        // If time allows, it will be modified to instead make a selection near midday
        var selectForecasts = [];

        // Add 5 forecasts
        for (var i = 0; i < 5; i++) {
            // Choose forecasts at even intervals
            // Every 8th forecasts because 8 * 3 hr = 24 hr
            // Add 7 so that last selected is 39th
            selectForecasts.push(allForecasts[i * 8 + 7]);
        }

        //console.log(selectForecasts);
        return selectForecasts;
    }

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
            // Display date of current prediction
            $("#current-date").text(formatDate(response.dt, response.timezone));
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
            // console.log(response);
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

    // Function to request and display 5-day forecast
    function displayForecast(cityName) {

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=e97fecefd6f8473cda5766ca71e143de&units=imperial&q=" + cityName;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Select forecasts to use
            var forecasts = selectForecasts(response.list);

            // Loop through forecasts and html elements
            for (var i = 0; i < 5; i++) {
                
                // Add the date
                $(".forecast-date").eq(i).text(formatDate(forecasts[i].dt, response.city.timezone));

                // Display weather conditions
                $(".forecast-weather").eq(i).attr("src", "http://openweathermap.org/img/wn/" + forecasts[i].weather[0].icon + "@2x.png")
                $(".forecast-weather").eq(i).attr("alt", forecasts[i].weather[0].description)

                // Display temperature
                $(".forecast-temp").eq(i).text(forecasts[i].main.temp);

                // Display humidity
                $(".forecast-humidity").eq(i).text(forecasts[i].main.humidity);
            }

        })
    }

    // Event listener for searching a city
    $("#search-form").on("submit", function(event) {
        event.preventDefault();
        //console.log(this);

        // Display current weather
        displayCurrentWeather($("#search").val());

        // Display future weather
        displayForecast($("#search").val())

        // Clear searchbar
        $("#search").val("");

    })

});