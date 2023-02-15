const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const n = document.querySelector('.name');


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
console.log(hours);

function getTimeOfDay() {
   const time = ['morning,', 'afterternoon,', 'evening,', 'nigth,'];
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
