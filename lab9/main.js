const searchBar = document.querySelector('#searchBar');
const searchbBtn = document.querySelector('#searchBtn')
const cities = document.querySelector('#cities');
const weatherTemp = document.querySelector('#weatherTemp').content;
const main = document.querySelector('main');
const body = document.querySelector('body');

window.onload = () => {
  cityToList();
  loadCities();
}

const cityToList = async () => {
  cities.textContent = '';
  const data = await fetchCities();
  data.forEach((element) => {
    const option = document.createElement('option');
    option.textContent = element;
    option.value = element;
    cities.appendChild(option)
  });
}

const loadCities = () => {
  const cities = Storage.get();

  for (const i of cities) {
    addWeather(i);
  }
}

const addWeather = async (city) => {
  const data = await fetchWeather(city);
  if (data.cod === '404') {
    throw new Error(data.message);
  }
  const clone = weatherTemp.cloneNode(true);
  clone.querySelector('.city').textContent = data.name;
  clone.querySelector('.temp').innerHTML = parseInt(data.main.temp) + " &deg;C";
  clone.querySelector('.feelslike').innerHTML = "Feels like: " + parseInt(data.main.feels_like) + " &deg;C";
  clone.querySelector('.humidity').textContent = "Humidity: " + data.main.humidity + " %";
  clone.querySelector('.icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  clone.querySelector('.description').textContent = data.weather[0].main;
  clone.querySelector('.wind').textContent = "Wind speed: " + data.wind.speed + " km/h";
  main.appendChild(clone);
  return data.name;
}

const displayError = (errorMessage) => {
  const error = document.createElement('div');
  error.classList.add('error');
  error.textContent = errorMessage;
  const btn = document.createElement('button');
  btn.textContent = 'OK';
  btn.addEventListener('click', e => {
    e.target.parentNode.remove();
  })
  error.appendChild(btn);
  body.appendChild(error);
}

searchbBtn.addEventListener('click', () => {
  const city = searchBar.value;
  console.log('clicked with', city);
  // console.log(city);
  Storage.hasAvailableSpace() ?
    addWeather(city)
      .then(city => Storage.set(city))
      .catch(error => displayError(error))
    : displayError('Error: No space in storage');
})

const API_KEY = 'e90e0b5a70ccd873175190ae64d3431a';

export const fetchCities = async () => {
  const res = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities')
    .then(x => x.json())
    .then(x => x.data.map(el => {
      const city = el.city.toLowerCase();
      return city[0].toUpperCase() + city.slice(1);
    }));
  return res;
}

export const fetchWeather = async (city) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(x => x.json());
  return res;
}

class Storage {
  static hasAvailableSpace() {
    return Storage.get().length < 10;
  }

  static set(city) {
    if (!Storage.hasAvailableSpace()) {
      return false;
    }

    const cities = JSON.parse(localStorage.getItem('cities'));
    if (!cities) {
      localStorage.setItem('cities', JSON.stringify([city]));
      return true;
    }
    else {
      localStorage.setItem('cities', JSON.stringify([...cities, city]));
      return true;
    }
  }

  static get() {
    const cities = JSON.parse(localStorage.getItem('cities'));
    if (Array.isArray(cities))
      return cities;
    else return [];
  }
}

// var tmp = document.getElementById('test');
// tmp.innerHTML += city;
