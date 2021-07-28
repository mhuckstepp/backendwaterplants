require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const db = require("./api/data/db-config");

const mailSender = async (recip, plants) => {
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

const scheduledRun = async () => {
  let users = await db("users");
  users.forEach(async (user) => {
    let plantsToWater = "";
    let plantsByUser = await db("plants").where({ user_id: user.user_id });
    plantsByUser.forEach(async (plant) => {
      let dayCounter = Math.floor((Date.now() - plant.baseDate) / 86400000);
      if (dayCounter % plant.water_freq === 0) {
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


scheduledRun();
