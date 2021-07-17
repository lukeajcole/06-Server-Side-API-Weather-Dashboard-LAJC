{/* 
    
    
<h1 class="p-2">Today's weather:</h1>
<h3 id = "dayTemp" class="p-2">Temperature:</h3>
<h3 id="dayWind" class="p-2">Wind Speed:</h3>
<h3 id = "dayHumidity" class="p-2">Humidity:</h3>
<h3 id = "dayUv" class="p-2">UV Index:</h3>
</div> */}

// <div class="card m-3 flex-shrink-0 forCard" ">
//      <img src="..." class="card-img-top" alt="...">
//      <div class="card-body">
//          <h5 class="card-title">Card title</h5>
//          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//          <a href="#" class="btn btn-primary">Go somewhere</a>
//      </div>
// </div>

{/* <div id='searchCont' style="background-color:antiquewhite" class="col-3 m-2 border d-flex  flex-column align-items-center">
<h2 class="text-center m-1 p-2">Search For a City</h2>
<input id='searchInput' class="m-2 p-2 b" type='text' placeholder="Enter a city name...">
<button id='searchBtn' class="m-1 p-2 btn-lg">Search</button>
</div> */}

var mainCol = $('#mainCol');
var forcastDaysEl = $('#forcastDays');
var dayWeatherEl = $('#dayWeather');
var searchBtn = $('#searchBtn');
var searchInput = $('#searchInput');


makeDayCard();

makeForcastCards();


function makeForcastCards(){

    for (i=0; i < 5; i++){
        var forCard = $('<div>');
            forCard.addClass('card m-3 flex-shrink-0 forCard')
        var imgEl = $('<img>');
            imgEl.attr('src',"...");
            imgEl.attr('alt',"...");
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




function makeDayCard(){

    var headEl = $("<h1 >")
        headEl.addClass("p-2");
        headEl.text('Today\'s Weather');
    var tempEl = $("<h3>")
        tempEl.addClass("p-2");
        tempEl.text('Temperature');
    var windEl = $("<h3>")
        windEl.addClass("p-2");
        windEl.text('WindSpeed');
    var humEl = $("<h3>")
        humEl.addClass("p-2");
        humEl.text('Humidity');
    var uvEl = $("<h3>")
        uvEl.addClass("p-2");
        uvEl.text('UV Index');
    
        dayWeatherEl.append(headEl, tempEl, windEl,humEl,uvEl);
}