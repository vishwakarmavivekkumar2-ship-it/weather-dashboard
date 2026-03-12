const apiKey = "2af1d22a5381447ff45a0d2570011d6c";

async function getWeather(){

const city = document.getElementById("cityInput").value;

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

try{

const weatherRes = await fetch(weatherURL);
const weatherData = await weatherRes.json();

if(weatherData.cod !== 200){
alert("City not found");
return;
}

const condition = weatherData.weather[0].main;

const temp = weatherData.main.temp;
const humidity = weatherData.main.humidity;
const wind = weatherData.wind.speed;

document.getElementById("weatherBox").innerHTML =

`
<h2>${weatherData.name}</h2>
<p>🌡 Temperature: ${temp}°C</p>
<p>☁ Condition: ${condition}</p>
<p>💧 Humidity: ${humidity}%</p>
<p>🌬 Wind: ${wind} m/s</p>
`;

changeVideo(condition);

/* Forecast */

const forecastRes = await fetch(forecastURL);
const forecastData = await forecastRes.json();

showForecast(forecastData);

}catch(error){

alert("Error fetching weather");

}

}

function showForecast(data){

const forecastBox = document.getElementById("forecast");

forecastBox.innerHTML="";

/* show title after search */
document.getElementById("forecastTitle").style.display = "block";

for(let i=0;i<7;i++){

const item = data.list[i*5];

forecastBox.innerHTML +=

`
<div class="card">
<p>${new Date(item.dt_txt).toDateString()}</p>
<p>${item.main.temp}°C</p>
<p>${item.weather[0].main}</p>
</div>
`;

}

}

/* Background Video Change */

function changeVideo(condition){

const video = document.getElementById("bgVideo");

let videoFile = "";

if(condition === "Clear")
videoFile = "sunny.mov";

else if(condition === "Clouds")
videoFile = "cloudy.mov";

else if(condition === "Rain")
videoFile = "rain.mov";

else if(condition === "Snow")
videoFile = "snowfall.mov";

else if(condition === "Thunderstorm")
videoFile = "storm.mov";

else if(condition === "Fog" || condition === "Mist" || condition === "Haze")
videoFile = "fog.mov";

video.src = videoFile;

}