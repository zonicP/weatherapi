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


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}

function searchMyLocation(position) {
  let apiKey = "a3a44d10ff3b9efe308aaf2dc7e9d22e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}


function searchCity(city) {
  let apiKey = "a3a44d10ff3b9efe308aaf2dc7e9d22e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios .get(apiUrl)
        .then(displayWeatherCondition); //funcion que se va ejecutar cuando regresa la respueta del servidor
}




function displayWeatherCondition(response) {
  
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.getElementById("humiditybar").style.width=`${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  getBigImage(response.data.weather[0].main);
  

  document.querySelector("#visibility").innerHTML = response.data.visibility / 100;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;

  searchLocationForecasts(response);

}

function searchLocationForecasts(response) {
  let apiKey = "a3a44d10ff3b9efe308aaf2dc7e9d22e";
  let apiUrlForecasts = `https://api.openweathermap.org/data/2.5/forecast?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}`;
  axios.get(apiUrlForecasts).then(displayForecasts);
}


function displayForecasts(response){
  const mapRespUI= new Map()
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
    document.querySelector(`#tempMin${i}`).innerHTML = Math.round(response.data.list[mapRespUI.get(index=i)].main.temp_min /10);
    document.querySelector(`#tempMax${i}`).innerHTML = Math.round(response.data.list[mapRespUI.get(index=i)].main.temp_max /10);
  }

}


function getBigImage(weatherDescription){
  
  let img = document.getElementById("bigLogo");

  if(weatherDescription == "Clouds"){
    img.src = "./HeavyCloud.png";
  }
  if(weatherDescription == "Rain"){
    img.src = "./HeavyRain.png";
  }
  if(weatherDescription == "Clear"){
    img.src = "./Clear.png";
  }
  else{
    img.src = "./LightCloud.png";
  }
}


function getImage(imageType,cardNum){
  
  let img = document.createElement("img");
  img.setAttribute("id", `imgWeather${cardNum}`);

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
  let src = document.getElementById(cardNum);
  

  if(src.childElementCount > 0){
    let oldImage = document.getElementById(`imgWeather${cardNum}`);
    oldImage.remove();
  }
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
  let mydate = `${dateValue}T00:00:00`;
  return moment(mydate).format('ddd');

}


function convertFarenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * (5/9); 
} 


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}


let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime); 

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");


