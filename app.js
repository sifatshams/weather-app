const BASE_URL =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const API_KEY = 'f26f736270eb1d624acad427ce73cf4d';

const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('btn');

const cityText = document.querySelector('.city');
const tempText = document.querySelector('.temp');
const humidityText = document.querySelector('.humidity');
const windText = document.querySelector('.wind');
const weatherIcon = document.querySelector('.weather_icon');
const weatherName = document.querySelector('.fillWeather');

// write main function
async function getWeather(city) {
  if (city.trim() === '') {
    alert('Please write the city name!');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}${city}&appid=${API_KEY}`);
    const data = await response.json();

    // if city not found
    if (!response.ok) {
      alert('City not found!');
      return;
    }
    cityText.textContent = data.name;
    tempText.innerText = Math.round(data.main.temp) + '°C';
    humidityText.innerText = data.main.humidity + '%';
    windText.innerText = data.wind.speed + ' Km/h';
    weatherName.innerText = data.weather[0].main;

    if (data.weather[0].main === 'Clouds') {
      weatherIcon.src = 'img/clouds.png';
    } else if (data.weather[0].main === 'Clear') {
      weatherIcon.src = 'img/clear.png';
    } else if (data.weather[0].main === 'Rain') {
      weatherIcon.src = 'img/rain.png';
    } else if (data.weather[0].main === 'Drizzle') {
      weatherIcon.src = 'img/drizzle.png';
    } else if (data.weather[0].main === 'Mist') {
      weatherIcon.src = 'img/mist.png';
    }
  } catch (error) {
    console.log(error);
    alert('Something went wrong!');
  }
}

// event fire
searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value);
});

cityInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    getWeather(cityInput.value);
  }
});

// call the function
getWeather('Dhaka');
