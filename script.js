let appId = 'e109b74f2efd786c4194d0efb32c9211';
let units = 'imperial';
let searchMethod ;

//search
function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm){
        searchMethod = 'zip';
    }else{
        searchMethod = 'q'
    }
}

//api
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(response => response.json())
    .then(data => {
        init(data);
    })
}

//background img
function init(dataFromServer) {
    console.log(dataFromServer);
    switch (dataFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/clear.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/cloudy.jpg")';
            break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("img/rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("img/snow.jpg")';
            break;
        
        default:
            break;
    }
    
    //descriptions
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/'+ dataFromServer.weather[0].icon + '.png';
    // weatherIcon.src = 'http://openweathermap.org/img/wn/10d@2x.png'

    let resultDescription = dataFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription;

}

//searchBtn
document.getElementById('searchBtn').addEventListener('click',()=>{
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})



