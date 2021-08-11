require("dotenv").config();
import axios from "axios";
import db from "./api/data/db-config";
let apiKey = process.env.WEATHER_API_KEY;
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import { Plant } from "./api/plants/plant.interface";
import { User } from "./api/auth/user.interface";

export const mailSender = async (recip: string, plants: string) => {
  const msg = {
    to: `${recip}`,
    from: "test@emailplants.com",
    subject: "Plants to water today!",
    text: `Please water these plants today! ${plants}. To view all your plants, please visit https://water-my-plants-mhuckstepp.vercel.app/myplants`,
    html: `<p> Please water these plants today!</p> <h3> ${plants} </h3> <br> <p> To view all your plants, please visit https://water-my-plants-mhuckstepp.vercel.app/myplants </p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent", msg);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const checkAndMail = async () => {
  let users = await db("users");
  users.forEach(async (user: User) => {
    let plantsToWater = "";
    let plantsByUser = await db("plants").where({ user_id: user.user_id });
    plantsByUser.forEach(async (plant: Plant) => {
      let dayCounter = Math.floor((Date.now() - plant.baseDate) / 86400000);
      if (dayCounter % Number(plant.water_freq) === 0) {
        if (plantsToWater.length === 0) {
          plantsToWater = `${plant.nickname}.`;
        } else {
          plantsToWater = `${plant.nickname}, ` + plantsToWater;
        }
      }
    });
    if (plantsToWater.length > 1) {
      console.log(
        `sending email to ${user.user_email} about ${plantsToWater} `
      );
      mailSender(user.user_email, plantsToWater);
    } else {
      console.log("Checked for plants to be watered but didn't find any");
    }
  });
};

export const rainCheckerFunc = async () => {
  let places: any[] = await db.from("users").select("location").distinct();
  for (const place of places) {
    console.log(place);
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${place.location}&appid=${apiKey}`
      )
      .then(async (response) => {
        let weather = response.data.weather[0].main;
        console.log("rainchecker run", weather);
        if (/rain/i.test(weather) || /showers/i.test(weather)) {
          let users = await db("users")
            .select("user_id")
            .where("location", place.location);
          for (const user of users) {
            let updated = await db("plants")
              .update("baseDate", Date.now())
              .where("user_id", user.user_id);
            console.log(updated);
          }
        }
      })
      .catch((err) => console.log(err));
  }
};
