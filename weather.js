const icon = document.querySelector(".w"),
    temp = document.querySelector(".temp p"),
    desc = document.querySelector(".desc p"),
    timeDate = document.getElementById("time"),
    loc = document.querySelector(".location h3"),
    wind = document.querySelector(".wind p"),
    humi = document.querySelector(".humi p"),
    press = document.querySelector(".pressure p"),
    country = document.getElementById("country"),
    input = document.getElementById("myInput"),
    button = document.querySelector("button"),
    checkBox = document.querySelector(".checkbox"),
    disp = document.querySelector(".display");
// ---Adding event listeners--- //
button.addEventListener("click", submit);
checkBox.addEventListener("change", conversion);

function submit(ev) {
    ev.preventDefault();
    getTime();
    if (input.value != "") sendR();
    input.value = "";
}

function sendR() {
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}`;
    show();
    fetch(endPoint)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
            hide();
            if (response.status == 404) {
                alert("City not found! \nPlease enter a valid name!");
            }
            throw new Error(response.statusText);
        })
        .then(function(myJson) {
            const weath = myJson.weather[0];
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

function setZero(x) {
    return (x < 10) ? (x = '0' + x) : x;
}

function getTime() {
    const today = new Date(),
        d = today.getDate(),
        m = (today.getMonth() + 1),
        y = today.getFullYear(),
        h = setZero(today.getHours()),
        min = setZero(today.getMinutes());
    timeDate.innerHTML = `Date: ${d}.${m}.${y}. <br> Time: ${h}:${min}`;
}

function show() {
    disp.style.display = "grid";
}

function hide() {
    disp.style.display = "none";
}

function conversion() {
    return checkBox.checked ? temp.innerHTML = Math.round((currentTemp - 273.15) * 10) / 10 + "°C" : temp.innerHTML = currentTemp + "K";
}

window.onload = hide();