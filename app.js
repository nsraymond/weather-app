const API_KEY = '25c2b9995d3385a38d7741ebc3e0b0af';

const weatherDataEl = document.getElementsByClassName("weather-data");
const cityInputEl = document.getElementById("input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
    cityInputEl.value = " ";   
});

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`)


        if(!response.ok){
            throw new Error("Network response issues")
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`,
        ]

        const iconEl = document.querySelector(".icon").innerHTML = 
        `<img src="http://openweathermap.org/img/wn/${icon}.png" 
        alt="weather Icon">`;

        const tempEl = document.querySelector(".temperature").innerHTML= 
        `<div class="temperature">${temperature}℃</div>`;

        const descEl = document.querySelector(".description").innerHTML = 
        `<div class="description">${description}</div>`

        const detailEl = document.querySelector(".details").innerHTML = 
        details.map((detail)=> `<div>${detail}</div>`).join(" ");
    } catch(error){
        const iconEl = document.querySelector(".icon").innerHTML = " ";

        const tempEl = document.querySelector(".temperature").innerHTML= " ";

        const descEl = document.querySelector(".description").innerHTML = 
        "Sorry an error occured, please check the City or try again later"

        const detailEl = document.querySelector(".details").innerHTML = " ";
    }
}