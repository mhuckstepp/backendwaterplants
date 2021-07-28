require("dotenv").config();
const axios = require("axios");
const db = require("./api/data/db-config");
let apiKey = process.env.WEATHER_API_KEY;

const rainCheckerFunc = async () => {
  const rainCheckMemo = {};
  let users = await db("users");
  for (const user of users) {
    let place = user.location;
    let user_id = user.user_id;
    // if we dont have weather for that specific place go and get it
    if (!rainCheckMemo[place]) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`
        )
        .then((response) => {
          let weather = response.data.weather[0].main;
          console.log("rainchecker run", weather);
          if (/rain/i.test(weather) || /showers/i.test(weather)) {
            rainCheckMemo[place] = "rain";
          } else {
            rainCheckMemo[place] = "No rain";
          }
        })
        .catch((err) => console.log(err));
    }
    // if it rained there reset the plants watering date
    if (rainCheckMemo[place] === "rain") {
      await db("plants").update({ baseDate: Date.now() }).where({ user_id });
    }
  }
};

rainCheckerFunc();
