var mainCol = $('#mainCol');
var forcastDaysEl = $('#forcastDays');
var dayWeatherEl = $('#dayWeather');
var searchBtn = $('#searchBtn');
var searchInput = $('#searchInput');
var prevSearchEl = $('#prevSearch');
var API_key = "5117aac26351ca3a76a8a4b1d679c8eb"
var apiData;
var searchStr;
var unitSwitch = $('#unitSwitch');
var unitSwitchVal; //Holds the boolean of the switch state
var unitType; //gets imperial or metric to pass into url
var tempUnit;
var winUnit;
var prevSearches; //Hold array of jsons for prev search criteria;
var city;
var state;
var country;

prevSearches = JSON.parse(localStorage.getItem('prevSearches')) || [];
// Get the last searched state of the switch or true
unitSwitchVal = localStorage.getItem('lastUnit');
//Get the last search string or palm springs
searchStr = localStorage.getItem('lastSearchStr') || 'palm%20springs';
searchInput.val(decodeURI(searchStr));

// Set the state of the toggle to the localStorage value and populate the variable
// unitSwitch.prop('checked', unitSwitchVal).change();

///NEED To fix this
if (unitSwitchVal == 'true'){
    unitType = 'imperial'
    unitSwitch.addClass('btn-primary');
    unitSwitch.removeClass('btn-default off');
    unitSwitch.prop('checked', true);
    tempUnit= "F";
    winUnit= "MPH";
    
} else {
    unitType = 'metric'
    unitSwitch.addClass('btn-default off');
    unitSwitch.removeClass('btn-primary');
    unitSwitch.prop('checked', false);
    tempUnit = "C"
    winUnit = "M/S"
}


getLocation(); //Load the weather  using the last search

// update the unitType when the toggle changes
unitSwitch.change(function() {
    unitSwitchVal = $(this).prop('checked');
    console.log(unitSwitchVal);
    if (unitSwitchVal){
        unitType = 'imperial'
        tempUnit= "F";
        winUnit= "MPH";
    } else {
        unitType = 'metric'
        tempUnit = "C"
        winUnit = "M/S"
    }
    localStorage.setItem('lastUnit', unitSwitchVal);
    getLocation(); //Run the search to update the units
});

//run the search; update the last search data
searchBtn.on('click', function(){
    searchStr = encodeURI(searchInput.val().trim());
    console.log(searchStr);
    console.log(unitType);
    localStorage.setItem('lastSearchStr',searchStr);
    localStorage.setItem('lastUnit', unitSwitchVal);
    getLocation();
})

function storeSearch(){
    //Write the new search to the localStorage it it's not already in there AND if the search works
    var searchExists = false;
    if (prevSearches.length == 0){
        searchExists = false;
    } else {
        for (i=0;i < prevSearches.length; i++){
            var comp1 = searchStr.toUpperCase();
            var comp2 = prevSearches[i].toUpperCase();
            if(comp1 == comp2){
                searchExists = true;
            }
        }
    }
    if (!searchExists){
        prevSearches.push(searchStr);
        localStorage.setItem('prevSearches', JSON.stringify(prevSearches));
    }
}

function getLocation(){
    // Construct the URL for the GeoCode Open Weather IPA
    var geocodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchStr + '&limit=5&appid=' + API_key;
       fetch(geocodeUrl).then(function(response){
            if (response.ok) {
                response.json().then(function(data){       
                    //If there are results then use lattitude and longitude to a function that gets the one call weather 
                    if (data.length > 0) {
                        $('#resultsCheck').text("");
                        city = data[0].name;
                        state = data[0].state;
                        country = data[0].country;
                        getApiResponse(data[0].lat, data[0].lon); //Get the first result from geoCode. This could be improved to allow user to pick from list if multiple results exists
                        storeSearch(); //Store the search in the local storage
                    } else {
                        $('#resultsCheck').text("No Results");
                    }

                })
            }
        })
    }

function getApiResponse(lat, lon, city, state, country){
    goodResults = true;
    //construct the URL for the ONE CALL openWeather API
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&units=' + unitType + '&appid=' + API_key;
    fetch(apiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                //Call the function that makes all of the page updates
                displayWeather(data);
            })
        }
    })
}

function displayWeather(weatherData){
    //Clear the elements to make way for the new ones
    forcastDaysEl.empty();
    dayWeatherEl.empty();
    //Call function to make the Today weather card
    makeDayCard(weatherData);
    //Call the function to make the forcast weather cards
    makeForcastCards(weatherData);
    makePreviousSearches();
}

function makeDayCard(weatherData){
    var headEl = $("<h1 >")
        headEl.addClass("p-2");
        headEl.text('Today\'s Weather for ' + city + ", " + state + ", " + country );
    var tempEl = $("<h3>")
        tempEl.addClass("p-2");
        tempEl.text('Temperature: ' + weatherData.current.temp + decodeURI('%20%C2%B0') + tempUnit);
    var windEl = $("<h3>")
        windEl.addClass("p-2");
        windEl.text('WindSpeed: ' + weatherData.current.wind_speed + " " + winUnit);
    var humEl = $("<h3>")
        humEl.addClass("p-2");
        humEl.text('Humidity: ' + weatherData.current.humidity + "%");
    var uvRow = $("<div>");
    uvRow.addClass('row');
    var uvEl = $("<h3>")
        uvEl.addClass("p-2 d-inline w-auto");
        uvEl.text('UV Index:');
        var indexEl = getUVIndexEl(weatherData.current.uvi)
    uvRow.append(uvEl, indexEl);
    
        dayWeatherEl.append(headEl, tempEl, windEl,humEl,uvRow);
}

function makeForcastCards(weatherData){
    for (i=0; i < 5; i++){
        var forCard = $('<div>');
            forCard.addClass('card m-1 flex-shrink-0 forCard')
        var imgEl = $('<img>');
        var iconSrc = 'http://openweathermap.org/img/wn/' + weatherData.daily[i].weather[0].icon + '@2x.png';
            imgEl.attr('src',iconSrc);
            imgEl.attr('alt',"weather icon");
            imgEl.addClass('card-img-top img-fluid');
        var bodyEl = $('<div>');
            bodyEl.addClass('card-body');
            var cardDate = $('<h5>');
                cardDate.addClass('card-title');
                forcastDate = handleUnixDate(weatherData.daily[i].dt)
                cardDate.text(forcastDate);
            var cardTemp = $('<h5>');
                cardTemp.addClass('card-title');
                cardTemp.text("Temp: " + String(Math.round(weatherData.daily[i].temp.max)) + "/" + String(Math.round(weatherData.daily[i].temp.min)) + decodeURI('%20%C2%B0') + tempUnit);
            var cardWind = $('<h5>');
                cardWind.addClass('card-title');
                cardWind.text("Wind Speed: " + String(Math.round(weatherData.daily[i].wind_speed)) + " " + winUnit);
            var cardHumidity = $('<h5>');
                cardHumidity.addClass('card-title');
                cardHumidity.text("Humidity: " + String(weatherData.daily[i].humidity) + "%");
        bodyEl.append(cardDate, cardTemp,cardWind,cardHumidity);
        forCard.append(imgEl, bodyEl)
        forcastDaysEl.append(forCard)
    }
}

function makePreviousSearches (){
    var searchNum = prevSearches.length;
    prevSearchEl.empty();
    for (i=0; i< searchNum; i++){
        var prevBtn = $("<button>");
        prevBtn.addClass("m-1 p-2 btn-lg");
        prevBtn.attr('onclick', 'runSearch(this.value)');
        prevBtn.attr('value', prevSearches[i]);
        prevBtn.text(decodeURI(prevSearches[i]));
        prevSearchEl.append(prevBtn);    
    }
}

function runSearch(val){
    searchStr = val;
    console.log(searchStr);
    searchInput.val(decodeURI(searchStr));
    getLocation();
}
function handleUnixDate(dt){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(dt * 1000);
    //  Month part from the timestamp
    var month = String(date.getMonth() + 1);
    // day of the month part from the timestamp
    var day = String(date.getDate());
    // 4 digit year part from the timestamp
    var year = String(date.getFullYear());

    // Will display time in 10:30:23 format
    var forcastDate =  month.padStart(2, '0') + "/" + day.padStart(2, '0') + "/" + year;
        return forcastDate;
}


function getUVIndexEl(val){
    var indexEl = $("<div>");
    indexEl.addClass('border rounded-pill p-3 d-inline w-auto text-center font-weight-bold')
    var color;

    
    indexEl.text(val);

    if (val <= 2){
        color = 'green';
    } else if(val <=5){
        color = 'yellow';
    } else if(val <=7){
        color = 'orange';
    } else if(val <=10){
        color = 'red';
    } else if(val >= 11){
        color = 'violet';
    }

    indexEl.css("background-color", color);
    console.log('INDEX EL');
    return indexEl;   
}