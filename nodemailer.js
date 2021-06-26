const nodeMailer = require('nodemailer')

const password = process.env.EMAIL_PASSWORD;

let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'mhuckstepp@gmail.com',
            pass: password
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: 'info@gmail.com',
        subject: req.body.subject,
        text: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: 'index.html' });
    res.end();
  });