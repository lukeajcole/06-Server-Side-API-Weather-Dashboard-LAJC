var mainCol = $('#mainCol');
var forcastDaysEl = $('#forcastDays');
var dayWeatherEl = $('#dayWeather');
var searchBtn = $('#searchBtn');
var searchInput = $('#searchInput');
var API_key = "5117aac26351ca3a76a8a4b1d679c8eb"
var apiData;
var searchStr = 'san%20diego';

getLocation(searchStr);


function getLocation(searchStr){
    var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchStr + '&limit=5&appid=' + API_key;
    console.log(geocodeUrl);
        fetch(geocodeUrl).then(function(response){
            if (response.ok) {
                response.json().then(function(data){
                    console.log(data);
                    getApiResponse(data[0].lat, data[0].lon);
                })
            }
        })
    }

function getApiResponse(lat, lon){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&units=imperial&appid=' + API_key;
    console.log(apiUrl);
    var weatherData;

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                weatherData = data;
                displayWeather(data);
            })
        }
    })
}

function displayWeather(weatherData){
    console.log(weatherData);
    
    makeDayCard(weatherData);

    makeForcastCards();
}

function makeDayCard(weatherData){

    var headEl = $("<h1 >")
        headEl.addClass("p-2");
        headEl.text('Today\'s Weather');
    var tempEl = $("<h3>")
        tempEl.addClass("p-2");
        tempEl.text('Temperature: ' + weatherData.current.temp);
    var windEl = $("<h3>")
        windEl.addClass("p-2");
        windEl.text('WindSpeed: ' + weatherData.current.wind_speed);
    var humEl = $("<h3>")
        humEl.addClass("p-2");
        humEl.text('Humidity: ' + weatherData.current.humidity);
    var uvEl = $("<h3>")
        uvEl.addClass("p-2");
        uvEl.text('UV Index: ' + weatherData.current.uvi);
    
        dayWeatherEl.append(headEl, tempEl, windEl,humEl,uvEl);
}

function makeForcastCards(){

    for (i=0; i < 5; i++){
        var forCard = $('<div>');
            forCard.addClass('card m-3 flex-shrink-0 forCard')
        var imgEl = $('<img>');
            // imgEl.attr('src',"...");
            // imgEl.attr('alt',"...");
            imgEl.addClass('card-img-top');
        var bodyEl = $('<div>');
            bodyEl.addClass('card-body');
            var cardTitle = $('<h5>');
                cardTitle.addClass('card-title');
                cardTitle.text("Card Title");
            var cardText = $('<p>');
                cardText.addClass('card-text');
                cardText.text('Some quick example text to build on the card title and make up the bulk of the card\'s content.')
            var cardBtn = $('<a>');
                cardBtn.addClass("btn btn-primary")
                cardBtn.attr('href','#');
                cardBtn.text('go Somewhere')

        bodyEl.append(cardTitle,cardText,cardBtn);
        forCard.append(imgEl, bodyEl)
        forcastDaysEl.append(forCard)
    }
}



