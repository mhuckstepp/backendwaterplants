const axios = require("axios");
require("dotenv").config();

let apiKey = process.env.WEATHER_API_KEY;
let lat = "37.7749";
let lon = "-122.4194";
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&appid=${apiKey}`;
let cityUrl = `https://api.openweathermap.org/data/2.5/forecast?q='san%20francisco'&appid=${apiKey}`
axios
  .get(cityUrl)
  .then((response) => {
    console.log(response);
    
  })
  .catch((err) => console.log(err));
