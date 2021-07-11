const api = {
    key: "e6355f2d02d3d11c7194fc6198d98e25",
    proxy: "https://mycorsproxy-shubh.herokuapp.com/"
}

let count = 0;
let index = 0;
let currentText = 'Loading.....';
let currentLetter = '';
let reached = false;

(function type(){

    if(index == currentText.length || reached)
    {
        return;
    }

    letter = currentText.slice(0, ++index);
    document.querySelector('.temp').textContent = letter;
    
    setTimeout(type, 350);

}());

const searchbox = document.querySelector('.search'); //begins the searchbox implementation

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
        let long = position.coords.longitude;
        let lat = position.coords.latitude;


        fetch(`${api.proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
            .then(response =>{
                return response.json();
            }) .then (displayResults);
    });
}

searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13) //13 means the enter key
    {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){ 
    fetch(`${api.proxy}api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather =>{
            return weather.json();
        }).then (displayResults);
}

function displayResults(weather){
    reached = true;
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = " ";

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    console.log(city);

    let now = new Date();
    let date = document.querySelector('.location .date');

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `High: ${Math.round(weather.main.temp_max)}°c  Low: ${Math.round(weather.main.temp_min)}°c`;
}
