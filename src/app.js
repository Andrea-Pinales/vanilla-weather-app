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
  let icon = document.querySelector("#large-img");

  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
let apiKey = `6b3d29e35af9a0ad7b7cb7c2b0e0a388`;
let city = "Mexicali";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(showDetails);

//function to change openweather icons to custom icons
// function changeIcon (change) {
//   if (icon === 01d) {
//     icon = "01d_241.png";
//   }

//   return icon;
// }

// let icon = document.querySelector("#large-img");
// icon.setAttribute("src", `assets/${response.data.weather[0].icon}`);
// icon.innerHTML = changeIcon();

// function to change background day and night
function changeBackground(hours) {
  if (hours < 7 && hours > 17) {
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
