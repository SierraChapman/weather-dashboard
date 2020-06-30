# Weather Dashboard

This weather dashboard uses three APIs from OpenWeatherMap to display information about the current weather, current UV Index, and 5-day forecast for a city. The user can search for cities in a search bar. Recently viewed cities are saved in localStorage and displayed in the sidebar so the user can easily click on them to view their weather again. 

## Code Snippets

The biggest challenges in creating this application were making the correct API calls and parsing out and interpreting the desired information from the response. For example, the app was required to display icons representing the current and forecasted weather conditions. An exploration of the API response determined that one can access an icon property whose value is a cryptic string such as `"02d"`. A search of the OpenWeatherMap website revealed that the icon for this weather condition is stored at `"https://openweathermap.org/img/wn/02d@2x.png"`, and the URL's for the other icons follow the same pattern. Additionally, each icon is associated with a description, which is included in the API response. For example, the `"02d"` icon (shown below) represents `"few clouds"`.

![few clouds](https://openweathermap.org/img/wn/02d@2x.png)

Using this information, the application displays the icon representing the current weather conditions by setting the `src` and `alt` attributes of an `img` element in the following lines of JavaScript code.

```javascript
$("#current-weather").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
$("#current-weather").attr("alt", response.weather[0].description);
```

## Demo

The GIF below demonstrates searching for a city, selecting a city from the recently viewed list, and clearing the search history.

![Demonstration of the scheduling application](demo.gif)

Visit the [deployed link](https://sierrachapman.github.io/weather-dashboard/) to use the application.

## Built with

* [OpenWeather API](https://openweathermap.org/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [jQuery](https://jquery.com/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Bootstrap](https://getbootstrap.com/)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

## Deployed Link

* [See Live Site](https://sierrachapman.github.io/weather-dashboard/)

## Authors

* **Sierra Chapman** 
    - [Portfolio Site](https://sierrachapman.github.io/)
    - [Github](https://github.com/SierraChapman)
    - [LinkedIn](https://www.linkedin.com/in/sierra-chapman)

## Acknowledgments

* This application's user interface was based on a design by Trilogy Education Services, a 2U, Inc.