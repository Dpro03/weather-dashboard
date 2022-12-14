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

//function to populate first card to page
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
//function to populate 5 day forecast to page
function createFiveDayCards(forecastArray) {
  console.log("five day cards");
  var fiveDayContent = document.getElementById("forecast-cards");
  console.log(fiveDayContent);
  for (let i = 7; i < forecastArray.length; i += 8) {
    console.log(forecastArray[i]);
  }
  //populate five day forecast cards
  $("#temp1").html("Temp: " + forecastArray[1].main.temp + "\u00B0F");
  $("#icon1").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[1].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#desc1").html("Forecast: " + forecastArray[1].weather[0].description);
  $("#wind1").html("Wind-Speed: " + forecastArray[2].wind.speed + "MPH");
  $("#humidity1").html("Humidity: " + forecastArray[2].main.humidity + "%");
  $("#temp2").html("Temp: " + forecastArray[2].main.temp + "\u00B0F");
  $("#icon2").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[2].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#desc2").html("Forecast: " + forecastArray[2].weather[0].description);

  $("#wind2").html("Wind-Speed: " + forecastArray[2].wind.speed + "MPH");
  $("#humidity2").html("Humidity: " + forecastArray[2].main.humidity + "%");
  $("#temp3").html("Temp: " + forecastArray[3].main.temp + "\u00B0F");
  $("#icon3").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[3].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#desc3").html("Forecast:  " + forecastArray[3].weather[0].description);

  $("#wind3").html("Wind-Speed: " + forecastArray[3].wind.speed + "MPH");
  $("#humidity3").html("Humidity: " + forecastArray[3].main.humidity + "%");
  $("#temp4").html("Temp: " + forecastArray[4].main.temp + "\u00B0F");
  $("#icon4").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[4].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#desc4").html("Forecast: " + forecastArray[4].weather[0].description);

  $("#wind4").html("Wind-Speed: " + forecastArray[4].wind.speed + "MPH");
  $("#humidity4").html("Humidity: " + forecastArray[4].main.humidity + "%");
  $("#temp5").html("Temp: " + forecastArray[5].main.temp + "\u00B0");
  $("#icon5").html(
    "<img src='http://openweathermap.org/img/w/" +
      forecastArray[5].weather[0].icon +
      ".png' alt='Icon depicting current weather.'>"
  );
  $("#desc5").html("Forecast: " + forecastArray[5].weather[0].description);

  $("#wind5").html("Wind-Speed: " + forecastArray[5].wind.speed + "MPH");
  $("#humidity5").html("Humidity: " + forecastArray[5].main.humidity + "%");
}
//add dayjs to forecast cards to get current nd subsequent days
$(".date").html(dayjs().format("MMMM D YYYY"));
$(".date1").html(dayjs().add(1, "day").format("MMMM D YYYY"));
$(".date2").html(dayjs().add(2, "day").format("MMMM D YYYY"));
$(".date3").html(dayjs().add(3, "day").format("MMMM D YYYY"));
$(".date4").html(dayjs().add(4, "day").format("MMMM D YYYY"));
$(".date5").html(dayjs().add(5, "day").format("MMMM D YYYY"));

var form = document.getElementById("custom-search");
form.addEventListener("submit", handleFormSubmit);

//function to search api for five day forecast
function getFiveDayApi(lon, lat) {
  var baseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=951288ed331fb8d9f59c36aaaba66bad`;
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      createFiveDayCards(data.list);
    });
}
//function to search api for current weather
function searchApi(city) {
  var baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=951288ed331fb8d9f59c36aaaba66bad&units=imperial`;
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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
  //sets local storage
  searchApi(event.target[0].value);
  var form = document.getElementById("custom-search");
  form.addEventListener("submit", handleFormSubmit);
  saveCity(event.target[0].value);
  console.log(localStorage);
}
function saveCity(newCity) {
  var cityArray = JSON.parse(localStorage.getItem("city")) || [];
  if (cityArray.includes(newCity)) {
    return;
  }
  cityArray.push(newCity);
  if (cityArray.length > 5) {
    cityArray.shift();
  }
  localStorage.setItem("city", JSON.stringify(cityArray));
  renderCities();
}

function renderCities() {
  var cityArray = JSON.parse(localStorage.getItem("city")) || [];
  if (cityArray.length === 0) {
    return;
  }
  $("#list").empty();
  for (let i = 0; i < cityArray.length; i++) {
    var button = document.createElement("button");
    button.innerHTML = cityArray[i];
    button.addEventListener("click", function () {
      searchApi(cityArray[i]);
    });
    $("#list").append(button);
  }
}
renderCities();
