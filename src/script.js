function showTemperature(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#current-city");
  let currentTemperature = document.querySelector("#current-temperature");
  let weatherDescription = document.querySelector("#weather-description");
  let tempMin = document.querySelector("#temp-min");
  let tempMax = document.querySelector("#temp-max");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  wind.innerHTML = Math.round(response.data.wind.speed) * 3.6;
  humidity.innerHTML = response.data.main.humidity;
}

let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hannover&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
