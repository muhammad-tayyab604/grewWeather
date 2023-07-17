// API Fetching

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const apiKey = "42d5f4f5bd64ebb372d9dccf15ff1f02";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
var currentDate = new Date();

var dayOfWeek = currentDate.toLocaleString("en-us", { weekday: "short" }); // Get the short day of the week (e.g., Sun)
var month = currentDate.toLocaleString("en-us", { month: "short" }); // Get the short month name (e.g., Jul)
var day = currentDate.getDate(); // Get the day (1-31)
var year = currentDate.getFullYear(); // Get the full year (e.g., 2023)
var hours = currentDate.getHours(); // Get the hours in 24-hour format (0-23)
var minutes = currentDate.getMinutes(); // Get the minutes (0-59)
var ampm = hours >= 12 ? "pm" : "am"; // Determine if it's AM or PM
hours = hours % 12 || 12; // Convert to 12-hour format

var formattedDate =
  dayOfWeek +
  " " +
  month +
  " " +
  day +
  " " +
  year +
  " " +
  hours +
  ":" +
  (minutes < 10 ? "0" : "") +
  minutes +
  " " +
  ampm;

async function weatherInfo(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".masterWeather").style.display = "none";
  } else {
    const data = await response.json();
    // console.log(data);
    // Adding Data
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".minmaxtemp").innerHTML =
      Math.round(data.main.temp_max) +
      "°" +
      "/" +
      Math.round(data.main.temp_min) +
      "°";
    document.querySelector(".feelsLike").innerHTML =
      "Feels Like " + Math.round(data.main.feels_like);

    if (data.weather[0].main === "Clouds") {
      document.querySelector(".abweather").innerHTML = "Mostly Cloudy";
      if (hours >= 18 && hours < 6) {
        weatherIcon.src = "images/cloudynight.svg";
      } else {
        weatherIcon.src = "images/clouds.svg";
      }
    } else if (data.weather[0].main === "Clear") {
      document.querySelector(".abweather").innerHTML = "Clear";
      if (hours >= 18 && hours < 6) {
        weatherIcon.src = "images/clearNight.svg";
      } else {
        weatherIcon.src = "images/clear.svg";
      }
    } else if (data.weather[0].main === "Rain") {
      document.querySelector(".abweather").innerHTML = "Rainy";
      weatherIcon.src = "images/rain.svg";
    } else if (data.weather[0].main === "Mist") {
      document.querySelector(".abweather").innerHTML = "Mist";
      weatherIcon.src = "images/mist.svg";
    } else if (data.weather[0].main === "Snow") {
      document.querySelector(".abweather").innerHTML = "Snowy";
      weatherIcon.src = "images/snow.svg";
    } else if (data.weather[0].main === "Drizzle") {
      document.querySelector(".abweather").innerHTML = "Drizzle";
      weatherIcon.src = "images/drizzle.svg";
    }
    var offsetSeconds = data.timezone; // -18000 seconds represents -5 hours

    var currentDate = new Date();
    var offsetMinutes = offsetSeconds / 60; // Convert seconds to minutes
    var localOffset = currentDate.getTimezoneOffset(); // Get the local timezone offset in minutes

    var targetOffset = localOffset + offsetMinutes;
    var targetDate = new Date(currentDate.getTime() + targetOffset * 60 * 1000);
    var formattedDate = targetDate.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    document.querySelector(".datetime").innerHTML = formattedDate;

    document.querySelector(".masterWeather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  weatherInfo(searchBox.value);
});

// Hamburger togle

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburgerButton.addEventListener("click", function () {
    navLinks.classList.toggle("hidden");
  });
});
