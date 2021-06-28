const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const db = require("./api/data/db-config");

const recipt = "mhuckstepp@gmail.com";
const conter = {
  subject: "HELLOOO",
  text: " nice to e-meet you",
};

const mailSender = async (recip, content) => {
  const msg = {
    to: recip,
    from: "mhuckstepp@gmail.com",
    subject: content.subject,
    text: content.text,
    html: `<p>${content.text}</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

mailSender(recipt, conter);
