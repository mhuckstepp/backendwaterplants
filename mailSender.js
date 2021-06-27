const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = (recip, content) => {
  const msg = {
    to: recip,
    from: "mhuckstepp@gmail.com",
    subject: content.subject,
    text: content.text,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
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

module.exports = {
  mailSender,
};
