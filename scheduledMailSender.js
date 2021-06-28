const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const db = require("./api/data/db-config");

const mailSender = async (recip, content) => {
<<<<<<< HEAD
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

=======
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

const 


>>>>>>> 116c0761fc17aa5d8ad8395ff03ddd69b15071ca
mailSender();
