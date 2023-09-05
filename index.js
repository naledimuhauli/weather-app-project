//feature 1
let now = new Date();
let h2 = document.querySelector("h3");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedneday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

/*function searchCity(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#search-text-input");
  let city = document.querySelector(".change");
  city.innerHTML = inputValue.value;

  let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);*/

/*bonus feature
function measureCelsius() {
  let celsiusTemp = document.querySelector("#celcius");
 celsiusTemp.innerHTML = `21`;
}
let celsiusTemp = document.querySelector(".degrees-1");
celsiusTemp.addEventListener("click", measureCelsius);

function measureFahren() {
  let farenheitTemp = document.querySelector("#celcius");
  farenheitTemp.innerHTML = `68`;
}
let farenheitTemp = document.querySelector(".degrees-2");
farenheitTemp.addEventListener("click", measureFahren);
*/

function changingCities(event) {
  event.preventDefault();

  let gettingInput = document.querySelector("#search-text-input");
  let city = gettingInput.value;
  let cities = document.querySelector(".change");
  cities.innerHTML = city.toUpperCase();

  let apiKey = "d7968ba5c334606078d89f51a7ec07e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //updateTimeAndDay();

  axios.get(apiUrl).then(getWeatherDetails);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", changingCities);

function getWeatherDetails(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let weatherDescription = response.data.weather[0].description;

  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `Currently ${temperature}°C`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

  let weatherDescriptionElement = document.querySelector("#condition");
  weatherDescriptionElement.innerHTML = `Weather: ${weatherDescription}`;
}

//using button for current city
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d7968ba5c334606078d89f51a7ec07e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let humidity = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    let weatherDescription = response.data.weather[0].description;
    let city = response.data.name.toUpperCase();

    //updating on html
    let cityElement = document.querySelector(".change");
    cityElement.innerHTML = city;
    let temperatureElement = document.querySelector(".h2");
    temperatureElement.innerHTML = `Currently ${temperature}°C`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

    let weatherDescriptionElement = document.querySelector("#condition");
    weatherDescriptionElement.innerHTML = `Weather: ${weatherDescription}`;
    updateTimeAndDay();
  });
}
function getCurrentPos() {
  navigator.geolocation.getCurrentPosition(showPosition); //getting the actual position
}

let currentLocationButton = document.querySelector("#btn-success");
currentLocationButton.addEventListener("click", getCurrentPos);
