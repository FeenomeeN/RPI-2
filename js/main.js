const time = document.getElementById('time'),
date = document.getElementById('date'),
greeting = document.getElementById('greeting');
const names = document.getElementById('name');
 const focus = document.getElementById('focus');


const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind_speed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
let count;

const bases = ['./img/day/','./img/evening/','./img/morning/',"./img/night/"];
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];
let i = 0;
let statIndex = 0;





function showTime(){
    let today = new Date(),
    year = today.getFullYear();
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

    var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var myDate = new Date();

    date.innerHTML = `<span>Сегодня: </span>${myDate.getDate()}<span> </span>${months[myDate.getMonth()]}<span> </span>${year}<span>,</span>${days[myDate.getDay()]}`;

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

    setTimeout(showTime, 1000);
}

function addZero(n) {
    return (parseInt(n,10) < 10 ? '0' : '') + n;
}

function getRandom() {
    let min = 1;
    let max = 5;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function viewBgImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
    };
}

function getImage(x) {
    let x1;
    if (x == 1 || x == 3) {
    document.body.style.color = 'white';
    x1= x;
    } else {
    document.body.style.color = 'black';  
    x1= x;  
    }
    let index = -1;
    do {
        
    index = getRandom();
    }
    while (statIndex == index);
    const imageSrc = bases[x1] + images[index];
    viewBgImage(imageSrc);
    statIndex = index;
    i++;
    if (i == 6) { i = 0; x++; }
    if (x == 4) { x = 0; }
    }
//3600000
function setBgGreet() {
    let today = new Date(),
    hour = today.getHours();
    
    if (hour < 6) {  
    x = 3;
    getImage(x);
    greeting.textContent = 'Good Night, '
    
    } else if (hour < 12) {
    // Morning
    x = 2;
    getImage(x);
    greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
    // Afternoon
    x = 0;
    getImage(x);
    greeting.textContent = 'Good Afternoon, ';
    } else {
    x = 1;
    getImage(x);
    greeting.textContent = 'Good Evening, ';
    
    }
    setTimeout(setBgGreet, 3600000);
    }

function getName() {
    if(localStorage.getItem('name') === null) {
        names.textContent = '[Enter Name]';
    }else {
        names.textContent = localStorage.getItem('name');
    }
}

function clearName() {
    names.textContent = '';
}

function setName(e) {
    if(e.type === 'keypress') {
        if(e.wich == 13 || e.keyCode == 13) {
            if(names.textContent == ''){
            names.textContent = localStorage.getItem('name',e.target.innerText);
            names.blur();
            }else{

            localStorage.setItem('name',e.target.innerText);
            names.blur();

            }       
        }
    }else {
        if(names.textContent == ''){
            names.textContent = localStorage.getItem('name',e.target.innerText);
        }else{
            localStorage.setItem('name',e.target.innerText);
        }
    }
}

function clearFocus() {
    focus.textContent = '';
}

function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Focus]';
    }else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.wich == 13 || e.keyCode == 13) {
            if(focus.textContent == '') {
            focus.textContent = localStorage.getItem('focus',e.target.innerText);
            focus.blur();       
            }else{
            localStorage.setItem('focus',e.target.innerText);
            focus.blur();   
            }
        }
    }else {
        if(focus.textContent == '') {
            focus.textContent = localStorage.getItem('focus',e.target.innerText);      
            }else{
                localStorage.setItem('focus',e.target.innerText);
        }
    }
}

function setCity(event) {
    // city.textContent=city.textContent.trim();
    // var city_value = city.textContent;
    // if(localStorage.getItem('city_value') === null) {
    //     city_value.textContent = localStorage.getItem('city_value');
    // }
    // if(event.type==='click'){
      
    //   localStorage.setItem('city_value', city_value);
    //   city.textContent = '';
    // }
  
    // if(event.type==='blur'&& city.textContent == ''){
    //   city.textContent = localStorage.getItem('city_value');
    // }
    // if (event.code === 'Enter') {
    //     localStorage.setItem('city_value', city_value);
    //   getWeather();
    //   city.blur();
    // }
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
      }
  }


async function getWeather() {
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=2bced354633d138a848a77684ac6adfa&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind_speed.textContent = `${data.wind.speed.toFixed(0)} м/с`;
    humidity.textContent = `${data.main.humidity} %`; 
   
  }
 

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
// city.addEventListener('click', setCity);
// city.addEventListener('blur', setCity);

if (localStorage.getItem('count')){
    count=parseInt(localStorage.getItem('count'));
    }
    else{
    count=0;
    }

async function getQuote() {  
    const url = `https://type.fit/api/quotes`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data[count].text;
    figcaption.textContent = data[count].author;
    count++;
    localStorage.setItem('count', count);
  }
  document.addEventListener('DOMContentLoaded', getQuote);
  btn.addEventListener('click', getQuote);

names.addEventListener('keypress', setName);
names.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


showTime();

setBgGreet();
getName();
getFocus();

