[Welcome to My weather App!](https://lukeajcole.github.io/06-Server-Side-API-Weather-Dashboard-LAJC/index.html)


This was developed as a project for my bootcamp class. It uses the OpenWeather API to get weather data. The user can input any city name and run the search and it will get the weather data and display it on the page. There is also an added feature of a "toggle" that allows the user to switch between imperial and metric units of measure. When a search is run, it will be saved as a previous search so that the user can easily access it. If a search returns no result, then the content of the page is not changed, and it displays "No Result" below the search. 

![Image of the website](weatherapp.png)





Known Issues/Future Enhancements:
1. The search can only take a city name. Adding the state or country will yield no results
1. In order to get the weather data in one call, I needed to get the latitude and longitude of the city. however, I was unable to develop a way for the user to choose which city they want when there are multiple with the same name. A future enhancement could give the user a modal to select from the returned options, or maybe it could allow them to use more than just the city name to search. 