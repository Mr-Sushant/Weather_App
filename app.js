const notificationElem = document.querySelector(".notification");
const iconElem = document.querySelector(".weather-icon");
const tempElem = document.querySelector(".temperature-value p");
const descElem = document.querySelector(".temperature-description p");
const loacationElem = document.querySelector(".location p");
const kelvin = 273;
const key = "d27d9a6ace33d3dadfed61dd94ff2784";


const weather = {
    
};

weather.temperature = {
    unit : "celcius"
}

if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    notificationElem.style.display = "block";
    notificationElem.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

function setPosition(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    getWeather(lat,long);
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //console.log(api);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function showError(e){
    notificationElem.style.display = "block";
    notificationElem.innerHTML = `<p> ${e.message}</p>`;
}

function displayWeather(){
    iconElem.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;

    tempElem.innerHTML = `${weather.temperature.value} ° <span>C</span>`;

    descElem.innerHTML = weather.description;

    loacationElem.innerHTML = `${weather.city}, ${weather.country}`;
}

function cTof(cTemp){
    return ((cTemp*9/5)+32);
}

function fToc(fTemp){
    return ((fTemp-32)*5/9);
}

tempElem.addEventListener("click",function(){

    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == 'celcius'){
    let fahrenheit =  cTof(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempElem.innerHTML = `${fahrenheit} ° <span>F</span>`;
    weather.temperature.unit = "fahrenheit";
    }else{
        tempElem.innerHTML = `${weather.temperature.value}° <span>C</span>`; 
        weather.temperature.unit = "celcius";
    }
});