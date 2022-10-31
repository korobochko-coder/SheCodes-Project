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
  getLonLat(response.data.coordinates);
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
form.addEventListener("click", defineCity);

function showForecast(response) {
  console.log(response.data);
}

function getLonLat(coordinates) {
  console.log(coordinates);
  let key = "7t4511aeb08oa9c81f0a54cd96843e2c";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;
  axios.get(apiUrl2).then(showForecast);
}

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
