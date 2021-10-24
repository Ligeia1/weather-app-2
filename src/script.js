function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dateNumber = date.getDate();
  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;
  return `${day}, ${month} ${dateNumber}`;
}

function showTemperature(response) {
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let tempMin = document.querySelector("#temp-min");
  let tempMax = document.querySelector("#temp-max");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let currentDate = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");

  tempCelsius = response.data.main.temp;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  humidity.innerHTML = response.data.main.humidity;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let tempFahrenheit = (tempCelsius * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(tempFahrenheit);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(tempCelsius);
}

let tempCelsius = null;

let currentPosition = document.querySelector("#location-button");
currentPosition.addEventListener("click", getPosition);

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Hannover");
