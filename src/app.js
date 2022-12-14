
var days = [ ];

for (let i=0; i < 5; i++ ) {
	days.push(new Date(new Date().getTime() + (86400000* i)).toLocaleString('en-US', {weekday: 'long'}));
}

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
  forecast.length = 5;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row flex-nowrap">`;



  for (let forecastDay of forecast) {
          let i = forecast.indexOf(forecastDay) 
      
      forecastHTML += 
              `
              <div class="col-6">
              <div class="weather-forecast-date">${days[i]}</div>
              <img 
              src="${forecastDay.condition.icon_url}",
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
                
              };
              
              
              forecastHTML += `</div>`;
              forecastElement.innerHTML = forecastHTML;
              
            }
            
            
            
            function getForecast(coordinates) {
              console.log("got the coords", coordinates);
              let apiKey = "e60522t3c26b100da57f90o04ea3d53d";
              let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
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
              
            
              getForecast(response.data.coordinates);
              
            }
            
            function search(city) {
              let apiKey = "e60522t3c26b100da57f90o04ea3d53d";
              let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e60522t3c26b100da57f90o04ea3d53d&units=imperial`;
              
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
            let cityInputElement = document.querySelector("#city-input");
            cityInputElement.value = "New York";
            search(cityInputElement.value);
            