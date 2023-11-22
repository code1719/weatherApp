const apiKey = "4c0bb32bad9bb74e7299bd0640357ebc";
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=tooele&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=tooele&units=imperial&appid=${apiKey}`;

fetch(currentUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    let currentDesc = data.weather[0].description; // Get weather description
    document.getElementById("current-desc").innerHTML = currentDesc; // Set inner HTML

    let currentTemp = data.main.temp;
    document.getElementById("current-temp").innerHTML = currentTemp;

    let currentWindChill = data.main.feels_like;
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

    let today = new Date();
    let currentDay = today.getDay();

    for (let i = 0; i < 5; i++) {
      let forecastIndex = (currentDay + i) % 7;
      let dayIndex = forecastIndex === 0 ? 7 : forecastIndex;

      let temperature = Math.round(data.list[i * 8].main.temp); // Adjusting the interval to get different days
      let dayOfWeek = new Date(data.list[i * 8].dt_txt).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      );

      let dayOneData = Math.round(data.list[1].main.temp);
      let dayTwoData = Math.round(data.list[2].main.temp);
      let dayThreeData = Math.round(data.list[3].main.temp);
      let dayFourData = Math.round(data.list[4].main.temp);
      let dayFiveData = Math.round(data.list[5].main.temp);

      document.getElementById(`data${i + 1}`).innerHTML = temperature;
      document.getElementById(`dayTitle${i + 1}`).innerHTML = dayOfWeek;

      document.getElementById("data1").innerHTML = dayOneData;
      document.getElementById("data2").innerHTML = dayTwoData;
      document.getElementById("data3").innerHTML = dayThreeData;
      document.getElementById("data4").innerHTML = dayFourData;
      document.getElementById("data5").innerHTML = dayFiveData;
    }
  });

//
//   script.js:8
//   {coord: {…}, weather: Array(1), base: 'stations', main: {…}, visibility: 10000, …}
//   base
//   :
//   "stations"
//   clouds
//   :
//   all
//   :
//   0
//   [[Prototype]]
//   :
//   Object
//   cod
//   :
//   200
//   coord
//   :
//   lat
//   :
//   40.5308
//   lon
//   :
//   -112.2983
//   [[Prototype]]
//   :
//   Object
//   dt
//   :
//   1700673732
//   id
//   :
//   5783695
//   main
//   :
//   feels_like
//   :
//   35.91
//   humidity
//   :
//   68
//   pressure
//   :
//   1029
//   temp
//   :
//   38.79
//   temp_max
//   :
//   42.98
//   temp_min
//   :
//   36.16
//   [[Prototype]]
//   :
//   Object
//   name
//   :
//   "Tooele"
//   sys
//   :
//   country
//   :
//   "US"
//   id
//   :
//   2080099
//   sunrise
//   :
//   1700663018
//   sunset
//   :
//   1700698038
//   type
//   :
//   2
//   [[Prototype]]
//   :
//   Object
//   timezone
//   :
//   -25200
//   visibility
//   :
//   10000
//   weather
//   :
//   Array(1)
//   0
//   :
//   {id: 800, main: 'Clear', description: 'clear sky', icon: '01d'}
//   length
//   :
//   1
//   [[Prototype]]
//   :
//   Array(0)
//   wind
//   :
//   deg
//   :
//   321
//   gust
//   :
//   4
//   speed
//   :
//   4
//   [[Prototype]]
//   :
//   Object
//   [[Prototype]]
//   :
//   Object
