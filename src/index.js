function formatDate(date) {
  let dayNow = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayNow];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
let currentDateTime = document.querySelector("#date");
let dayTimeNow = new Date();
currentDateTime.innerHTML = formatDate(dayTimeNow);

function searchFor(city) {
  if (city) {
    let apiKey = "df7f4a357df681d0e606cod7bt0a90f8";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&units=${units}&key=${apiKey}`;
    axios.get(apiUrl).then(showWeatherCondition);
  } else {
    alert("Please enter a city name 🔍");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-name").value;
  searchFor(city);
}

function showWeatherCondition(response) {
  celsiusTemperature = response.data.temperature.current;
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "℃";
  document.querySelector(
    "#city-name-asked"
  ).innerHTML = `<strong>${response.data.city}</strong>`;
  document.querySelector(
    "#weather-today"
  ).innerHTML = `${response.data.condition.description}`;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#humidity-percent"
  ).innerHTML = `${response.data.temperature.humidity}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function showPosition(position) {
  let apiKey = "df7f4a357df681d0e606cod7bt0a90f8";
  let apiUrlCoordinates = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCoordinates).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionButton = document.querySelector("#current-location");
currentPositionButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature-now");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "℉";
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "℃";
}

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchFor("Seoul");
