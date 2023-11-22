const apiKey = "4c0bb32bad9bb74e7299bd0640357ebc";
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=tooele&units=imperial&appid=${apiKey}`;

fetch(currentUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let currentDesc = data.weather[0].description; // Get weather description
    document.getElementById("current-desc").innerHTML = currentDesc; // Set inner HTML

    let currentTemp = Math.round(data.main.temp);
    document.getElementById("current-temp").innerHTML = currentTemp;

    let currentWindChill = Math.round(data.main.feels_like);
    document.getElementById("current-windChill").innerHTML = currentWindChill;

    let currentHumid = data.main.humidity;
    document.getElementById("current-humid").innerHTML = currentHumid;

    let currentDirection = data.wind.deg;
    document.getElementById("current-direction").innerHTML =
      getCardinalDirection(currentDirection);

    let currentWindSpeed = Math.round(data.wind.speed);
    document.getElementById("current-windSpeed").innerHTML = currentWindSpeed;
  });

function getCardinalDirection(angle) {
  const directions = [
    "↑ N",
    "↗ NE",
    "→ E",
    "↘ SE",
    "↓ S",
    "↙ SW",
    "← W",
    "↖ NW",
  ];
  return directions[Math.round(angle / 45) % 8];
}

fetch(forecastUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Get today's date
    let today = new Date();

    // Loop through the next 5 days
    for (let i = 0; i < 5; i++) {
      // Calculate the forecast date by adding i * 8 hours to the current date
      let forecastDate = new Date(today);
      forecastDate.setDate(today.getDate() + i);
      forecastDate.setHours(12); // Assuming the API provides data around noon

      let weatherDescription = data.list[i * 8].weather[0].description;

      // Extract the forecasted temperature for the day
      let temperature = Math.round(data.list[i * 8].main.temp);

      // Get the day of the week for the forecasted date
      let dayOfWeek = forecastDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // Display the temperature and day of the week
      document.getElementById(`data${i + 1}`).innerHTML = temperature;
      document.getElementById(`dayTitle${i + 1}`).innerHTML = dayOfWeek;

      let imageElement = document.getElementById(`weatherIcon${i + 1}`);
      console.log(weatherDescription);
      if (weatherDescription.includes("rain")) {
        imageElement.src = "./images/Umbrella.jpg";
      } else if (weatherDescription.includes("clouds")) {
        imageElement.src = "./images/partlyCloudy.jpg";
      } else if (weatherDescription.includes("snow")) {
        imageElement.src = "./images/snow.png";
      } else if (weatherDescription.includes("clear")) {
        imageElement.src = "./images/Sunny.jpg";
      } else if (weatherDescription.includes("thunder")) {
        imageElement.src = "./images/thunderStorms.jpg";
      } else {
        imageElement.src = "./images/sadFace.png";
      }
    }
  });