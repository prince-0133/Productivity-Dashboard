function openfeatures() {

let allElems = document.querySelectorAll(".Elems");
let Fullelems = document.querySelectorAll(".Fullelems")
let FullelemsBackbtn = document.querySelectorAll(".Fullelems .back")

 allElems.forEach(function (elems)  {
    elems.addEventListener("click", function() {  
        Fullelems[elems.id].style.display = 'block' 

    })
 })

 FullelemsBackbtn.forEach(function(back) {
    back.addEventListener('click',function() {
        Fullelems[back.id].style.display = 'none'
    })
 })
}
   openfeatures()

// step 1 end ho gya hai yha tak


function todoList() {


let currentTask = []

if(localStorage.getItem('currentTask')) {
   currentTask = JSON.parse(localStorage.getItem('currentTask'))

} else {
   console.log('Task list is Empty');
}

function renderTask() {

   let allTask = document.querySelector('.allTask')

   var sum = ''

   currentTask.forEach(function (elem, idx) {
      sum = sum + `<div class="Task">
      <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
      <button id=${idx}>Mark as completed</button>
      </div>`
   })

   allTask.innerHTML = sum

   localStorage.setItem('currentTask', JSON.stringify(currentTask))

   document.querySelectorAll('.Task button').forEach(function (btn) {
      btn.addEventListener('click', function () {
         currentTask.splice(btn.id, 1)
         renderTask()
      })
   })

}

renderTask()


let form = document.querySelector('.addTask form')
let taskInput = document.querySelector('.addTask form input')
let taskDetailsInput = document.querySelector('.addTask form textarea')
let taskcheckbox = document.querySelector('.addTask form #check')


form.addEventListener('submit',function (e) {
   e.preventDefault()
   currentTask.push(
      {

      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskcheckbox.checked 
   }
)

   renderTask()

   taskInput.value =''
   taskDetailsInput.value = ''
   taskcheckbox.checked = false


} )
}
 todoList()

 //yha tak ka 2 part complete ho gya hai

 function dailyplanner() {

 var dailplanner = document.querySelector('.day-planner')
 var dayplanData = JSON.parse(localStorage.getItem('dayplanData')) || {}

var hours = Array.from({length:18},(elem,idx)=>`${6+idx}:00 - ${7+idx}:00`)

var wholeDaysum = ''

hours.forEach(function(elem,idx) {

   var savedData = dayplanData[idx] ||''

wholeDaysum = wholeDaysum + `<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value="${savedData}">

                </div>`
})

dailplanner.innerHTML = wholeDaysum

var dayplannerinput = document.querySelectorAll('.day-planner input')


dayplannerinput.forEach(function(elem) {
   elem.addEventListener('input',function() {
      console.log("saving:",elem.value);
      dayplanData[elem.id] = elem.value

      localStorage.setItem('dayplanData',JSON.stringify(dayplanData))
   })
})

 }
dailyplanner()

// yha tak 3 part complete

function motivationalQuote (){
  var motivationQuote = document.querySelector('.Motivation-2 h1')

var motivationAuthor = document.querySelector('.Motivation-3 h2')

async function fetchQuote() {
  let response = await fetch("https://dummyjson.com/quotes/random")
  let data = await response.json()
   motivationQuote.innerHTML = data.quote
   motivationAuthor.innerHTML = data.author
}
fetchQuote()
}
motivationalQuote()

// yha tak 4 part complete


function PomodoroTimer(){
  
let Timer = document.querySelector('.Pomo-Timer h1')
let StartBtn = document.querySelector('.Pomo-Timer .Start-Timer')
let PauseBtn = document.querySelector('.Pomo-Timer .Pause-Timer')
let ResetBtn = document.querySelector('.Pomo-Timer .Reset-Timer')
var session = document.querySelector('.Pomodoro-Fullpage .session')
var isworksession = true

let timerInterval = null;
let totalSeconds = 25 * 60


function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60)
  let seconds = totalSeconds % 60
  Timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
}

function StartTimer() {
  clearInterval(timerInterval)

  if (isworksession) {

    TimerInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--
        updateTimer()
      } else {
        isworksession = false
        clearInterval(timerInterval)
        Timer.innerHTML = '5:00'
        session.innerHTML = 'Take a Break'
        session.style.backgroundColor = 'var(--blue)'
        totalSeconds = 5 * 60

      }
    }, 1000)

  } else {

    timerInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--
        updateTimer()

      } else {
        isworksession = true
        clearInterval(TimerInterval)
        Timer.innerHTML = '25:00'
        session.innerHTML = 'Work Session'
        session.style.backgroundColor = 'var(--green)'
        totalSeconds = 25 * 60
      }
    }, 1000)
  }
}

function PauseTimer() {
  clearInterval(TimerInterval)
}
function ResetTimer() {
  totalSeconds = 25 * 60
  clearInterval(TimerInterval)
  updateTimer()
}

StartBtn.addEventListener('click', StartTimer);
PauseBtn.addEventListener('click', PauseTimer);
ResetBtn.addEventListener('click', ResetTimer);
}
PomodoroTimer()



document.getElementById("addBtn").addEventListener("click", function() {
    let inputField = document.getElementById("goalInput");
    let goalText = inputField.value.trim(); 

    if (goalText !== "") {
        let ul = document.querySelector(".goal-list");
        let li = document.createElement("li");
        
        li.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${goalText}</span>
            </label>
            <span class="delete-btn">❌</span>
        `;
        
        ul.appendChild(li);
        inputField.value = ""; 
    } else {
        alert("Pehle koi goal toh likho bhai!");
    }
});

document.querySelector(".goal-list").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove(); 
    }
});



var header1Time = document.querySelector('.header1 h1');
var header1Date = document.querySelector('.header1 h2');

var header2Temp = document.querySelector('.header2 h2');
var header2City = document.querySelector('.header2 h3');
var header2Condition = document.querySelector('.header2 h4');

var Precipitation = document.querySelector('.header2 .Precipitation');
var Humidity = document.querySelector('.header2 .Humidity');
var Wind = document.querySelector('.header2 .Wind');


const apikey = "8c2ed934d1be4a92914135533260710";
const city = "Bhopal";


async function weatherApiCall() {

    try {

        var response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
        );

        var data = await response.json();

        header2Temp.innerHTML = `${data.current.temp_c}°C`;

        header2City.innerHTML =
            `${data.location.name}, ${data.location.country}`;

        header2Condition.innerHTML =
            `${data.current.condition.text}`;

        Wind.innerHTML =
            `Wind: ${data.current.wind_kph} km/h`;

        Precipitation.innerHTML =
            `Precipitation: ${data.current.precip_mm} mm`;

        Humidity.innerHTML =
            `Humidity: ${data.current.humidity}%`;

    } catch (error) {

        console.log("Weather API Error:", error);

    }
}


weatherApiCall();


function timeDate() {

    const totalDaysofweek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var date = new Date();

    var dayofweek = totalDaysofweek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML =
        `${tarik} ${month}, ${year}`;

    var ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    header1Time.innerHTML =
        `${dayofweek}, ${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
}


timeDate();

setInterval(() => {
    timeDate();
}, 1000);


const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', function() {
    // Body par dark-theme class lagana aur hatana
    document.body.classList.toggle('dark-theme');
    
    // Icon ki jagah button ka text change karna
    if (document.body.classList.contains('dark-theme')) {
        themeBtn.innerText = "Light Mode"; // Dark mode hone par ye text dikhega
    } else {
        themeBtn.innerText = "Dark Mode"; // Wapas aane par ye text dikhega
    }
});