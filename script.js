const weatherApiKey = "4c0bb32bad9bb74e7299bd0640357ebc";
const newsApiKey = "f902d94fec2b4c34985718e7feaab270";
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${weatherApiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=tooele&units=imperial&appid=${weatherApiKey}`;
const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;

function init() {
  const title = document.getElementById("title").innerText.trim();

  if (title === "Current Weather") {
    fetchWeatherData();
  } else if (title === "Current News") {
    fetchNewsData();
  }
}

function fetchWeatherData() {
  fetch(currentUrl)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherForecast(data);
    });
}

function fetchNewsData() {
  fetch(newsUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayNews(data.articles);
    })
    .catch((error) => {
      console.error("Error fetching news data:", error);
    });
}

// Function to display current weather data
function displayCurrentWeather(data) {
  console.log(data);

  const {
    weather,
    main: { temp, feels_like, humidity },
    wind: { deg, speed },
  } = data;

  document.getElementById("current-desc").innerHTML = weather[0].description;
  document.getElementById("current-temp").innerHTML = Math.round(temp);
  document.getElementById("current-windChill").innerHTML =
    Math.round(feels_like);
  document.getElementById("current-humid").innerHTML = humidity;
  document.getElementById("current-direction").innerHTML =
    getCardinalDirection(deg);
  document.getElementById("current-windSpeed").innerHTML = Math.round(speed);
}

// Function to display weather forecast
function displayWeatherForecast(data) {
  console.log(data);

  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(today.getDate() + i);
    forecastDate.setHours(12);

    const { weather, main } = data.list[i * 8];
    const weatherDescription = weather[0].description;
    const temperature = Math.round(main.temp);
    const dayOfWeek = forecastDate.toLocaleDateString("en-US", {
      weekday: "long",
    });

    document.getElementById(`data${i + 1}`).innerHTML = temperature;
    document.getElementById(`dayTitle${i + 1}`).innerHTML = dayOfWeek;

    const imageElement = document.getElementById(`weatherIcon${i + 1}`);
    setImageBasedOnWeather(imageElement, weatherDescription);
  }
}

// Function to display news articles
function displayNews(articles) {
  const cards = document.querySelector("div.newsCards");

  if (!cards) {
    console.error("News section not found");
    return;
  }

  articles.forEach((article) => {
    if (
      article.title &&
      article.urlToImage &&
      article.description &&
      article.title.trim() !== "" &&
      article.description.trim() !== ""
    ) {
      const card = createNewsCard(article);
      cards.appendChild(card);
    }
  });
}

function createNewsCard(article) {
  const card = document.createElement("section");
  card.className = "newsCard";

  const h2 = document.createElement("h2");
  h2.textContent = article.title;
  card.appendChild(h2);

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const img = document.createElement("img");
  img.setAttribute("src", article.urlToImage);

  imageContainer.appendChild(img);
  card.appendChild(imageContainer);

  const description = document.createElement("p");
  description.textContent = article.description;
  card.appendChild(description);

  return card;
}

function setImageBasedOnWeather(imageElement, weatherDescription) {
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

document.addEventListener("DOMContentLoaded", () => {
  init();
});
