//set current date/time
function update() {
  $("#time").html(dayjs().format("MMMM D YYYY, H:mm:ss"));
}
setInterval(update, 1000);
var currentTime = dayjs().format("HH");

//setting variables
var button = document.getElementById("button");
var data = document.getElementsByClassName("wicon");
var searchVal = document.querySelector(".searchVal");
var city = $(".searchVal").val().trim();
var locationIcon = document.querySelector("#icon");

function searchApi(city) {
  var baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=951288ed331fb8d9f59c36aaaba66bad&units=imperial`;
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      populateFirstCard(data);
      getFiveDayApi(data.coord.lon, data.coord.lat);
    });
}

function populateFirstCard(data) {
  $("#location").html(data.name);
  $("#desc").html("Currently: " + data.weather[0].description);
  $("#temp").html("Temp: " + data.main.temp + "\u00B0F");
  $("#icon").html(
    "<img src='http://openweathermap.org/img/w/" +
      data.weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#wind").html("Wind-Speed: " + data.wind.speed + "MPH");
  $("#humidity").html("Humidity: " + data.main.humidity + "%");
}
function getFiveDayApi(lat, lon) {
  var baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=951288ed331fb8d9f59c36aaaba66bad&units=imperial`;
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      createFiveDayCards(data.list);
    });
}

function createFiveDayCards(forecastArray) {
  console.log("five day cards");
  var fiveDayContent = document.getElementById("forecast-cards");
  console.log(fiveDayContent);
  for (let i = 7; i < forecastArray.length; i += 8) {
    console.log(forecastArray[i]);
  }
  $("#temp1").html("Temp: " + forecastArray[1].main.temp + "\u00B0F");
  $("#icon1").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[1].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#wind1").html("Wind-Speed: " + forecastArray[2].wind.speed + "MPH");
  $("#humidity1").html("Humidity: " + forecastArray[2].main.humidity + "%");
  $("#temp2").html("Temp: " + forecastArray[2].main.temp + "\u00B0F");
  $("#icon2").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[2].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#wind2").html("Wind-Speed: " + forecastArray[2].wind.speed + "MPH");
  $("#humidity2").html("Humidity: " + forecastArray[2].main.humidity + "%");
  $("#temp3").html("Temp: " + forecastArray[3].main.temp + "\u00B0F");
  $("#icon3").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[3].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#wind3").html("Wind-Speed: " + forecastArray[3].wind.speed + "MPH");
  $("#humidity3").html("Humidity: " + forecastArray[3].main.humidity + "%");
  $("#temp4").html("Temp: " + forecastArray[4].main.temp + "\u00B0F");
  $("#icon4").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[4].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#wind4").html("Wind-Speed: " + forecastArray[4].wind.speed + "MPH");
  $("#humidity4").html("Humidity: " + forecastArray[4].main.humidity + "%");
  $("#temp5").html("Temp: " + forecastArray[5].main.temp + "\u00B0");
  $("#icon5").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[5].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#wind5").html("Wind-Speed: " + forecastArray[5].wind.speed + "MPH");
  $("#humidity5").html("Humidity: " + forecastArray[5].main.humidity + "%");
}


function handleFormSubmit(event) {
  event.preventDefault();
  if (!event.target[0].value) {
    alert("You must enter a city name!");
    return;
  }
  searchApi(event.target[0].value);
}

var form = document.getElementById("custom-search");
form.addEventListener("submit", handleFormSubmit);
//}
function getFiveDayApi(lat, lon) {
  var baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=951288ed331fb8d9f59c36aaaba66bad&units=imperial`;
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      createFiveDayCards(data.list);
    });
}
function searchApi(city) {
  var baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=951288ed331fb8d9f59c36aaaba66bad&units=imperial`;
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      populateFirstCard(data);
      getFiveDayApi(data.coord.lon, data.coord.lat);
    });
}

  function handleFormSubmit(event) {
  event.preventDefault();
  if (!event.target[0].value) {
    alert("You must enter a city name!");
    return;
  }
  searchApi(event.target[0].value);

  var form = document.getElementById("custom-search");
}


