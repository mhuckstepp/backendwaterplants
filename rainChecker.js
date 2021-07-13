require("dotenv").config();
const axios = require("axios");
const db = require("./api/data/db-config");

let apiKey = process.env.WEATHER_API_KEY;
let cityId = 5391959;
let cityUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;
// currently set up to only check San Francisco weather and updates all plants. Future feature to check weather by each user by location and update specific plants
const rainCheckerFunc = async () => {
  axios
    .get(cityUrl)
    .then(async (response) => {
      let weather = response.data.weather[0].main;
      console.log('rainchecker run', weather, response.data.weather)
      if (/rain/i.test(weather) || /showers/i.test(weather)) {
        await db("plants").update({ baseDate: Date.now() });
      }
    })
    .catch((err) => console.log(err));
};

rainCheckerFunc();
