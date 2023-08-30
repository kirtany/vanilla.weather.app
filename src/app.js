let now = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
h2.innerHTML = `${day}, ${hours}:${minutes}`;

function searchyourCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  getWeather(cityInput.value);
}  
 
function formatDay(timestamp) { 
let date = new Date(timestamp * 1000); 
let day = date.getDay();
let days = ["Sun","Mon","Tue","Wed","Thur","Fir","Sat"];

return days[day] ; 
}




function displayForecast(response){
 let forecast= response.data.daily; 

  let forecastElement = document.querySelector("#forecast"); 

  let days= ["Thur","Fir","Sat","Sun"]; 

  let forecastHTML = `<div class ="row">`; 
 forecast.forEach(function (forecastDay,index) { 
  if (index< 6){
  forecastHTML=
  forecastHTML +  
  `
 <div class="col-2"> 
     <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
    ${index}
     <img 
     src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
     alt=""
     width="42"
     /> 
     <div class="weather-forecast-temperature">
         <span class="weather-forecast-temperature-max">${ Math.round(forecastDay.temp.max)}&deg;C</span> 
         <span class="weather-forecast-temperature-min">${ Math.round(forecastDay.temp.min)}&deg;C</span> 
     </div>
 </div>
  
 `; 
  }
});
  forecastHTML = forecastHTML+ `</div>`;
  forecastElement.innerHTML= forecastHTML; 
console.log(forecastHTML)
}
 function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey ="7059cb165caa3316bff682d263a01b1e";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
 }

let form = document.querySelector("form");
form.addEventListener("submit", searchyourCity);

function getWeather(city) {
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {  console.log(response);
  let temperatureElement = document.querySelector("#currentTemperature"); 
  let cityElement= document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
 
  
  let celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`; 

getForecast(response.data.coord);
}

function searchArea(position) {
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather); 
  
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchArea);
}

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", getCurrentLocation); 


