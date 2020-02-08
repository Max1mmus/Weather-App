
var icon = document.querySelector(".w");
var temp = document.querySelector(".temp p");
var desc = document.querySelector(".desc p");
var timeDate = document.getElementById("time");
var loc = document.querySelector(".location h3");
var wind = document.querySelector(".wind p");
var humi = document.querySelector(".humi p");
var press = document.querySelector(".pressure p");
var country = document.getElementById("country");
var input = document.getElementById("myInput");
var button = document.querySelector("button");
var checkBox = document.querySelector(".checkbox");
var disp = document.querySelector(".display");
// ---Adding event listeners--- //
button.addEventListener("click", submit);
checkBox.addEventListener("change", conversion);

function submit(ev){
    ev.preventDefault();
    getTime();
    if (input.value != "") sendR(); input.value = "";
}

function sendR (){
    var endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}`;
    show();
    fetch(endPoint)
        .then(function(response){
            if (response.ok){
                console.log(response);
                return response.json();
            }
            hide();
            if (response.status == 404){
                alert("City not found! \nPlease enter a valid name!");
            }
            throw new Error(response.statusText);
        })
        .then(function(myJson){
            var weath = myJson.weather[0];
            currentTemp = myJson.main.temp;
            desc.innerHTML = weath.main;
            loc.innerHTML = myJson.name;
            country.innerHTML = myJson.sys.country;
            wind.innerHTML = `Wind <br> ${myJson.wind.speed} m/s`;
            humi.innerHTML = `Humidity <br> ${myJson.main.humidity}%`;
            press.innerHTML = `Pressure <br> ${myJson.main.pressure} hPa`;
            conversion();

            const weatherConditions = new Map([
                ["Clear", "sun"],
                ["Clouds", "cloudy"],
                ["Rain", "chancerain"],
                ["Thunderstorm", "tstorms"],
                ["Snow", "flurries"],
                ["Drizzle", "drizzle"],
                ["Fog", "fog"],
                ["Mist", "fog"],
                ["Haze", "fog"],
                ["Smoke", "fog"]
            ]);
            icon.src = `icons/${weatherConditions.get(weath.main)}.png`;
        });
}

function setZero(x){
    return (x < 10) ? (x = ('0' + x)) : x;
}

function getTime(){
    var today = new Date();
    var d   = today.getDate();
    var m   = (today.getMonth() + 1);
    var y   = today.getFullYear();
    var h   = setZero(today.getHours());
    var min = setZero(today.getMinutes());
    timeDate.innerHTML = `Date: ${d}.${m}.${y}. <br> Time: ${h}:${min}`;
}

function show(){
    disp.style.display = "grid";
}

function hide(){
    disp.style.display = "none";
}

function conversion(){
    return checkBox.checked ? temp.innerHTML = Math.round((currentTemp - 273.15)*10)/10 + "°C" : temp.innerHTML = currentTemp + "K";
}

window.onload = hide();