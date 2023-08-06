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
    let apiKey = "96771e971243152d6b8948878c26adde";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
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

searchFor("Seoul");
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function showWeatherCondition(response) {
  document.querySelector("#temperature-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#city-name-asked"
  ).innerHTML = `<strong>${response.data.name}</strong>`;
  document.querySelector(
    "#weather-today"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `${response.data.wind.speed}`;
  document.querySelector(
    "#humidity-percent"
  ).innerHTML = `${response.data.main.humidity}`;
}

function showPosition(position) {
  let apiKey = "96771e971243152d6b8948878c26adde";
  let apiUrlCoordinates = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCoordinates).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPositionButton = document.querySelector("#current-location");
currentPositionButton.addEventListener("click", getCurrentLocation);
