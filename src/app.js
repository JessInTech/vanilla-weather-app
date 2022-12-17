
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
     for (let forecastDay of forecast) {
          let i = forecast.indexOf(forecastDay);
        }
    if (index < 6) { 
        
        forecastHTML += 
                `
                <div class="col-2">
                <div class="weather-forecast-date">
                ${days[i]}</div>
                <img 
                src="http//openweathermap.com/img/wn/${
                    forecastDay.weater[0].icon}@2x.png",
                alt=""
                width="42"
                />;
                <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>    
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
                </div>
                </div>
                `;
  )};
            forecastHTML += `</div>`;
            forecastElement.innerHTML = forecastHTML;
            
}
    










function getForecast(coordinates) {
  let apiKey = "502dc8f7ae36e57af1974e18d16a86f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${cordinates.latitude}&lon=${coordinates.longitude}&appid={apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let coordinatesElement = document.querySelector("#coordinates");


  coordinatesElement = response.data.coordinates;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  console.log("response.data", response.data);
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "7c8163af06b96db1c9990d6054e4d0ee";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid={apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  fahreneheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");