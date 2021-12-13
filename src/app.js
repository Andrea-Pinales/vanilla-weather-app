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

//function to show weather details
function showDetails(response) {
  console.log(response);
  let temperature = document.querySelector("h1");
  let city = document.querySelector("h2");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#current-date");

  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = `6b3d29e35af9a0ad7b7cb7c2b0e0a388`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=mexicali&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(showDetails);
