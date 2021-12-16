//function to last update
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

  return `${day}, ${hours}:${minutes}`;
}

//function to format date
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

//function to show weather details
function getForecast(coords) {
  console.log(coords);
  let apiKey = `863aa96abe5f8c1e9740ef03ccb228c4`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showDetails(response) {
  console.log(response);
  let temperature = document.querySelector("h1");
  let city = document.querySelector("h2");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#current-date");
  let icon = document.querySelector("#large-img");
  let highTemperature = document.querySelector("#high");
  let lowTemperature = document.querySelector("#low");

  celsius = response.data.main.temp;
  high = response.data.main.temp_max;
  low = response.data.main.temp_min;

  temperature.innerHTML = `${Math.round(celsius)}°C`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src", `assets/${response.data.weather[0].icon}_241.png`);
  highTemperature.innerHTML = `H:${Math.round(high)}°`;
  lowTemperature.innerHTML = `L:${Math.round(low)}°`;

  getForecast(response.data.coord);
}

// function to change background day and night
function changeBackground(hours) {
  if (hours > 7 && hours > 17) {
    background =
      "linear-gradient(to top, #5a9fef 0%, #5a9fef 1%, #001462 100%)";
  } else {
    background =
      "linear-gradient(160deg, #61b1fe 0%, #aedefe 48%, #82e0fe 100%)";
  }

  return background;
}

let background = document.querySelector("#big-card");
background.style.background = changeBackground(new Date().getHours());

//function to search weather
function search(city) {
  let units = "metric";
  let cityApiKey = `863aa96abe5f8c1e9740ef03ccb228c4`;
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${cityApiKey}&units=${units}`;

  axios.get(cityApiUrl).then(showDetails);
}

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  search(city.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchWeather);

//function to convert temperature, high and low units
function changeCelsius() {
  let selectTemperature = document.querySelector("h1");
  let selectHigh = document.querySelector("#high");
  let selectLow = document.querySelector("#low");
  selectTemperature.innerHTML = `${Math.round(celsius)}°C`;
  selectHigh.innerHTML = `H:${Math.ceil(high)}°`;
  selectLow.innerHTML = `L:${Math.floor(low)}°`;
}

function changeFahrenheit(event) {
  let selectTemperature = document.querySelector("h1");
  let selectHigh = document.querySelector("#high");
  let selectLow = document.querySelector("#low");
  let fahrenheit = (celsius * 9) / 5 + 32;
  let highFahrenheit = (high * 9) / 5 + 32;
  let lowFahrenheit = (low * 9) / 5 + 32;
  selectTemperature.innerHTML = `${Math.round(fahrenheit)}°F`;
  selectHigh.innerHTML = `H:${Math.ceil(highFahrenheit)}°`;
  selectLow.innerHTML = `L:${Math.floor(highFahrenheit)}°`;
}

let celsius = null;
let high = null;
let low = null;

function convertUnits(event) {
  event.preventDefault();
  if (event.target.value === "celsius") {
    changeCelsius();
  } else {
    changeFahrenheit();
  }
}

let unitsElement = document.querySelector("#degree-select");
unitsElement.addEventListener("change", convertUnits);

//forecast function
function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row justify-content-md-center">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="day1">
                <img src="assets/${
                  forecastDay.weather[0].icon
                }_241.png" class="sm-icon"/>
                <div class="high-forecast">
                    <h5 id="high-forecast">${Math.round(
                      forecastDay.temp.max
                    )}°</h3>
                </div>
                <div class="low-forecast">
                    <h5 id="low-forecast">${Math.round(
                      forecastDay.temp.min
                    )}°</h3>
                </div>
                <h4>${formatDay(forecastDay.dt)}</h4>
              </div>
            </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

search("Mexicali");
