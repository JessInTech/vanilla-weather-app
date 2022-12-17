

function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours= `0${hours}`;
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
        "Saturday"
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
    
}
function displayForecast(response) {
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
        days.forEach(function(forecastday) {
          forecastHTML = forecastHTML +  
            `
            <div class="col-2">
            <div class="weather-forecast-date">${forecastday.date}</div>
            <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${forecastday.temp.max}°</span>    
            <span class="weather-forecast-temperature-min">${forecastday.temp.min}°</span>
            </div>
            </div>
            `;
            forecastHTML = forecastHTML + 
            `
            <div class="col-2">
            <div class="weather-forecast-date">${forecastday.date}</div>
            <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
            alt=""
            width="42"
            />
            <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${forecastday.temp.max}°</span>    
            <span class="weather-forecast-temperature-min">${forecastday.temp.min}°</span>
            </div>
            </div>
            `;



       });
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "7c8163af06b96db1c9990d6054e4d0ee";
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metrics `;
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
    let coordinatesElement = document.querySelector("#coordinates")
    
    celsiusTemperature = response.data.temperature.current;
    
    coordinatesElement = response.data.coordinates;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute(
        "src",
        response.data.condition.icon_url,
        );
        iconElement.setAttribute("alt", response.data.condition.description);
        
    }
    

// getForecast(response.data.coordinates);



    function search(city) {
        let apiKey = "e60522t3c26b100da57f90o04ea3d53d";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=e60522t3c26b100da57f90o04ea3d53d&units=metric`;
        
        axios.get(apiUrl).then(displayTemperature);
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input");
        search(cityInputElement.value)
    }
    
    function displayFahrenheitTemperature(event){
        event.preventDefault();
        
        fahreneheitLink.classList.add("active");
        celsiusLink.classList.remove("active");
        let temperatureElement = document.querySelector("#temperature");
        let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
        temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
        
        
    }
    
    
    function displayCelsiusTemperature(event){ 
        event.preventDefault();
        celsiusLink.classList.add("active");
        fahreneheitLink.classList.remove("active");
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }
    
    
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);
    
    let celsiusTemperature = null;
    
    search('New York');

    
    let fahreneheitLink = document.querySelector("#fahrenheitLink");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
    
    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsiusTemperature);
    
    
    