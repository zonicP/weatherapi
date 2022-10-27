function formatDate(date) {
  //let hours = date.getHours();
  //if (hours < 10) {
  //  hours = `0${hours}`;
  //}
  //let minutes = date.getMinutes();
  //if (minutes < 10) {
  //  minutes = `0${minutes}`;
  //}

  let da = date.getDate();
  

  let month = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let mes =months[month]

  let dayIndex = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day = days[dayIndex];

  return `${day} ${da} ${mes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "a3a44d10ff3b9efe308aaf2dc7e9d22e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios .get(apiUrl)
        .then(displayWeatherCondition); //funcion que se va ejecutar cuando regresa la respueta del servidor
}



function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}



function searchLocation(position) {
  let apiKey = "a3a44d10ff3b9efe308aaf2dc7e9d22e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}




function searchLocationForecasts(position) {
  let apiKey = "a3a44d10ff3b9efe308aaf2dc7e9d22e";
  let apiUrlForecasts = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  axios.get(apiUrlForecasts).then(displayForecasts);
}


function getForecasts(){
  navigator.geolocation.getCurrentPosition(searchLocationForecasts);
}


function displayForecasts(response){
  let mapRespUI= new Map()
  mapRespUI.set(index = 1, responsePosition= 0); 
  mapRespUI.set(index= 2, responsePosition=8); 
  mapRespUI.set(index=3, responsePosition= 16); 
  mapRespUI.set(index=4, responsePosition= 24); 
  mapRespUI.set(index=5, responsePosition= 32);
  //mapRespoUI.set({index:6, responsePosition: 39}); 
  for(i=1;i<=5;i++) {
    document.querySelector(`#weekDayPlus${i}`).innerHTML = getWeekDay(response.data.list[mapRespUI.get(index=i)].dt_txt.slice(0,10));
    document.querySelector(`#numDayPlus${i}`).innerHTML = response.data.list[mapRespUI.get(index=i)].dt_txt.slice(8,10);
    document.querySelector(`#monthPlus${i}`).innerHTML = getMonthName(response.data.list[mapRespUI.get(index=i)].dt_txt.slice(5,7));
    let cardNum = `icondayplus${i}`;
    getImage(response.data.list[mapRespUI.get(index=i)].weather[0].main, cardNum);
    document.querySelector(`#tempMin${i}`).innerHTML = response.data.list[mapRespUI.get(index=i)].main.temp_min;
    document.querySelector(`#tempMax${i}`).innerHTML = response.data.list[mapRespUI.get(index=i)].main.temp_max;
  }

}


function getImage(imageType,cardNum){
  var img = document.createElement("img");
  if(imageType == "Clouds"){
    img.src = "./HeavyCloud.png";
  }
  if(imageType == "Rain"){
    img.src = "./HeavyRain.png";
  }
  if(imageType == "Clear"){
    img.src = "./Clear.png";
  }
  else{
    img.src = "./LightCloud.png";
  }
  img.width=80;
  img.height=80;
  var src = document.getElementById(cardNum);
  src.appendChild(img);
}

function getMonthName(i){
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  return months[i-1];
}

function getWeekDay(dateValue){
  var mydate = `${dateValue}T00:00:00`;
  return moment(mydate).format('ddd');

}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}




function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}




function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}




let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime); 


let searchForm = document.querySelector("#search-form");


searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
getForecasts();


