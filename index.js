const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const n = document.querySelector('.name');
let randomNum = getRandomNum();
const body = document.body;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
let city = document.querySelector('.city')




function showTime() {
   const date = new Date();
   const currentTime = date.toLocaleTimeString();
   time.textContent = currentTime; 
   showDate();
   showGreeting();
   setTimeout(showTime, 1000);
}

showTime();

function showDate() {
   const date = new Date();
   const options = { weekday: "long", month: 'long', day: 'numeric', timeZone: 'UTC' };
   const currentDate = date.toLocaleDateString('en-US', options);
   day.textContent = currentDate;
}


const date = new Date();
const hours = date.getHours();


function getTimeOfDay() {
   const time = ['morning,', 'afternoon,', 'evening,', 'nigth,'];
   const date = new Date();
   const hours = date.getHours();
   return hours < 5 ? time[3] : hours < 12 ? time[0] : hours < 17 ? time[1] : hours < 24 ? time[2] : time;
}

function showGreeting() {
const timeOfDay = getTimeOfDay();
const greetingText = `Good ${timeOfDay}`;
greeting.textContent = greetingText;
}

function setLocalStorage() {
   localStorage.setItem('name', n.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
   if (localStorage.getItem('name')) {
      n.value = localStorage.getItem('name');
   }
}
window.addEventListener('load', getLocalStorage)


function getRandomNum() {
   min = 1;
   max = 20;
   return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function setBg() {
   
   let timeOfDay = getTimeOfDay().slice(0, -1);
   let bgNum = randomNum.toString();
   bgNum = bgNum.padStart(2, "0");
   let img = new Image();
   img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`; 
   img.onload = () => {
      body.style.background = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`; 
   }; 
}
setBg();
function getSlideNext() {
randomNum = randomNum + 1;
if (randomNum == 20) {
   randomNum = 1;
} else randomNum;
   setBg();
}
function getSlidePrev() {
   randomNum = randomNum - 1;
   if (randomNum == 1) {
       randomNum = 20;
   } else randomNum;
   setBg();
}

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)

async function getWeather() {

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=af762d234214680ab0e00f820213dcee&units=metric`;
   const res = await fetch(url);
   const data = await res.json();

   weatherIcon.className = 'weather-icon owf'
   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
   temperature.textContent = `${Math.round(data.main.temp)}°C`;
   weatherDescription.textContent = data.weather[0].description;
}

city.addEventListener('change', getWeather);


