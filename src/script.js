function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconID = response.data.condition.icon_url;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", iconID);
  celsiusTemperature = response.data.temperature.current;
  latitude = response.data.coordinates.latitude;
  longitude = response.data.coordinates.longitude;
  getLonLat();
}

let longitude = null;
let latitude = null;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-4">
      <img
        src = "${forecastDay.condition.icon_url}" width=50px
      />
    </div>
    <div class="col-4">
      ${formatDay(forecastDay.time)}
    </div>
    <div class="col-4" id="forecast-temperature">
      ${Math.round(forecastDay.temperature.maximum)} <span>°C</span>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getLonLat() {
  let key = "7t4511aeb08oa9c81f0a54cd96843e2c";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${key}`;
  axios.get(apiUrl2).then(showForecast);
}

function defineCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#inputCity");
  console.log(cityElement.value);
  let city = cityElement.value;
  let apiKey = "7t4511aeb08oa9c81f0a54cd96843e2c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search");
form.addEventListener("click", defineCity, getLonLat);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function padTo2Digits(num) {
  return String(num).padStart(2, "0");
}

let day = days[now.getDay()];
let hour = padTo2Digits(now.getHours());
let min = padTo2Digits(now.getMinutes());

let dt = document.querySelector("#date");
dt.innerHTML = `${day} ${hour} : ${min}`;
