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
button.addEventListener("click",submit);
checkBox.addEventListener("change",conversion);

function submit(ev){
    ev.preventDefault();
    getTime();
    if(input.value != ""){
        sendR();
        input.value = "";   
    }
}

function sendR (){
    var endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}`;
    show();
    fetch(endPoint)
    .then(function(response){
        if(response.ok){
            console.log(response)
        return response.json()
    }
        hide();
        if(response.status == 404){
        alert("City not found! \nPlease enter a valid name!")
        }
        throw new Error(response.statusText);
    })
    .then(function(myJson){
        var w = myJson.weather[0];
        currentTemp = myJson.main.temp;
        desc.innerHTML = w.main;
        loc.innerHTML  = myJson.name;
        country.innerHTML = myJson.sys.country
        wind.innerHTML = "Wind" + "<br>" + myJson.wind.speed + "m/s";
        humi.innerHTML = "Humidity" + "<br>" + myJson.main.humidity + "%";
        press.innerHTML= "Pressure" + "<br>" + myJson.main.pressure + "hPa";
        conversion();
        switch(w.main){
            case "Clear":
                icon.src = "icons/sun.png"
            break;
            case "Clouds":
                icon.src="icons/cloudy.png"
            break;
            case "Rain":
                icon.src="icons/chancerain.png"
            break;
            case "Thunderstorm":
                icon.src="icons/tstorms.png"
            break;
            case "Snow":
                icon.src="icons/flurries.png"
            break;
            case "Drizzle":
                icon.src="icons/drizzle.png"
            break;
            case "Fog": case  "Mist" : case  "Haze": case "Smoke":
                icon.src="icons/fog.png"
            break;
        }
    })
}

function setZero(x){
    if(x < 10){
        x = "0" + x;
    }
    return x;
}

function getTime(){
    var today = new Date();
    var d   = today.getDate();
    var m   = (today.getMonth()+1);
    var y   = today.getFullYear();
    var h   = setZero(today.getHours());
    var min = setZero(today.getMinutes());
    timeDate.innerHTML = "Date: " + d + "." + m + "." + y + "." + "<br>" +
                         "Time: " + h + ":" + min;
}

function show(){
    var disp = document.querySelector(".display")
    disp.style.display = "grid"
}

function hide(){
    var disp = document.querySelector(".display")
    disp.style.display = "none"
}

function conversion(){
    if(checkBox.checked){
        temp.innerHTML = Math.round((currentTemp - 273.15)*10)/10 + "°C"
    }else{
        temp.innerHTML = currentTemp + "K";
    }   
}

window.onload = hide();