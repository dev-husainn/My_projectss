// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// e8ab5a0edfc70f7bc033d1d1b8c68417

const weatherApi = {
  key: "e8ab5a0edfc70f7bc033d1d1b8c68417",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

const searchInput = document.getElementById("input-box");

// Add Event Listener on keypress
searchInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    console.log(searchInput.value);
    getWeatherReport(searchInput.value);
    document.querySelector(".weather-details").style.display = "block";
  }
});

// Get Weather Report
const getWeatherReport = (city) => {
  fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((response) => {
      return response.json();
    })
    .then(showWeatherReport);
};

// Show Weather Report
const showWeatherReport = (response) => {
  let city = document.getElementById("city");
  city.innerText = `${response.name},${response.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(response.main.temp)}&deg;C`;

  let min_maxTemp = document.getElementById("min-max");
  min_maxTemp.innerHTML = `${Math.floor(
    response.main.temp_min
  )}&deg;C (min) / ${Math.ceil(response.main.temp_max)}&deg;C (max)`;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${response.weather[0].main}`;

  let humidity = document.getElementById("humidity");
  humidity.innerText = `Humidity : ${response.main.humidity}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = manageDate(todayDate);

  // Image based on weather type
  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url(img/sunny.jpg)";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url(img/clouds.jpg)";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url(img/rainy.jpg)";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url(img/snow.jpg)";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url(img/clouds.jpg)";
  }

  console.log(response);
};
// Date Manage

const manageDate = (dateArg) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
};
