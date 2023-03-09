import React, { useEffect, useState } from "react";
import './Weather.css' ;

const WeatherData = () => {
  const date = new Date();
  const arrayOfDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  const arrayOfMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [weather, setWeather] = useState({
    condition: "",
    city: "",
    temp: "",
    humidity: "",
    visibility: "",
    wind: "",
  });

  const [dayInfo] = useState({
    day: arrayOfDay.filter((item, index) => index === date.getDay()),
    date: date.getDate(),
    month: arrayOfMonth.filter((item, index) => index === date.getMonth()),
    year: date.getFullYear(),
  });

  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    second: "",
  });

  setInterval(() => {
    const date = new Date();
    let time = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      second: date.getSeconds(),
    };
    setTime(time);
  }, 1000);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }, []);

  function showPosition(position) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=93fa813196cde7d11c2d70ea06c9a3b1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", date);
        let weather = {
          condition: data.weather[0].description,
          city: data.name,
          temp: Math.round(data.main.temp - 273),
          humidity: data.main.humidity,
          visibility: data.visibility,
          wind: data.wind.speed,
        };
        setWeather(weather);
      });
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      var cityInput = e.target.value;
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=93fa813196cde7d11c2d70ea06c9a3b1`)
        .then((response) => response.json())
        .then((data) => {
          let weather = {
            condition: data.weather[0].description,
            city: data.name,
            temp: Math.round(data.main.temp - 273),
            humidity: data.main.humidity,
            visibility: data.visibility,
            wind: data.wind.speed,
          };
          setWeather(weather);
        })
        .catch(err=>console.log('Error'));
    }
    else{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition)
        }
    }
  };

  return(
     <div className="weather_app">
        <div className="time_day">
            <p className="timing">{time.hours}:{time.minutes}:{time.second} </p>
            <p className="day">{dayInfo.date} {dayInfo.month} {dayInfo.year} </p>
        </div>

        <div className="curr_weather">
            {weather.temp}<sup>o</sup>C
        </div>

        <div className="weather_search">
            <div className="weather_descp">
            <i class="fab fa-skyatlas"></i>
            <p>{weather.condition}</p>
            </div>
        </div>

        <hr/>

        <div className="searching">
            <input type="text" id="text" placeholder="Search Any City" onChange={handleChange} />
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="details">
            <p className="location">{weather.city}</p>
            <span id="hr"> <hr/> </span>
            <div className="details_row">
                <p>Temperature</p>
                <p>{weather.temp}<sup>o</sup>C</p>
            </div>
            <hr/>
            <div className="details_row">
                <p>Humidity</p>
                <p>{weather.humidity}%</p>
            </div>
            <hr/>
            <div className="details_row">
                <p>Visibility</p>
                <p>{weather.visibility} mi</p>
            </div>
            <hr/>
            <div className="details_row">
                <p>Wind</p>
                <p>{weather.wind} km/h</p>
            </div>
        </div>
     </div>
  )
};

export default WeatherData;
