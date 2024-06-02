// Function to convert timestamp to local time
function formatTime(timestamp) {
    let date = new Date(timestamp * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let formattedTime = hours + ':' + minutes + ':' + seconds;
    return formattedTime;
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2ee0c69f77mshf4769f27cbe37a9p1164bajsn82186ae18ce1',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

// Function to get weather for a specific city and update the main section
const getWeather = (city) => {
    document.getElementById('cityname').innerText = city;

    fetch("https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById('temp').innerText = response.temp;
            document.getElementById('feels_like').innerText = response.feels_like;
            document.getElementById('humidity').innerText = response.humidity;
            document.getElementById('max_temp').innerText = response.max_temp;
            document.getElementById('min_temp').innerText = response.min_temp;
            document.getElementById('sunrise').innerText = formatTime(response.sunrise);
            document.getElementById('sunset').innerText = formatTime(response.sunset);
            document.getElementById('cloud_pct').innerText = response.cloud_pct;
            document.getElementById('wind_degrees').innerText = response.wind_degrees;
            document.getElementById('wind_speed').innerText = response.wind_speed;
        })
        .catch(error => console.log(error));
}

// Function to get weather for a specific city and update the popular cities section
const getWeatherForCity = (city, prefix) => {
    fetch("https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById(`${prefix}_temp`).innerText = response.temp;
            document.getElementById(`${prefix}_feels_like`).innerText = response.feels_like;
            document.getElementById(`${prefix}_humidity`).innerText = response.humidity;
            document.getElementById(`${prefix}_max_temp`).innerText = response.max_temp;
            document.getElementById(`${prefix}_min_temp`).innerText = response.min_temp;
            document.getElementById(`${prefix}_sunrise`).innerText = formatTime(response.sunrise);
            document.getElementById(`${prefix}_sunset`).innerText = formatTime(response.sunset);
            document.getElementById(`${prefix}_cloud_pct`).innerText = response.cloud_pct;
            document.getElementById(`${prefix}_wind_degrees`).innerText = response.wind_degrees;
            document.getElementById(`${prefix}_wind_speed`).innerText = response.wind_speed;
        })
        .catch(error => console.log(error));
}

// Add event listener for the search button
document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});

// Initialize with default city
getWeather('Vadodara');

// Update weather for popular cities
const popularCities = [
    { name: 'Mumbai', prefix: 'mumbai' },
    { name: 'Bangalore', prefix: 'bangalore' },
    { name: 'Chennai', prefix: 'chennai' },
    { name: 'Delhi', prefix: 'delhi' },
    { name: 'Kolkata', prefix: 'kolkata' }
];

popularCities.forEach(city => getWeatherForCity(city.name, city.prefix));
let date = new Date(1716683481 * 1000);
console.log(date)