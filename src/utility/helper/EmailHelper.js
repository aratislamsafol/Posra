const nodemailer = require("nodemailer");

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "kamrul.soppiya@gmail.com",
      pass: "owaq bnha qxnq ydrw",
    },
  });

  let mailOption = {
    from: "POSRA Ecommerce Solution <kamrul.soppiya@gmail.com>",
    to:EmailTo,
    subject: EmailSubject,
    text: EmailText
    // html: if needed using html body
  }

  return await transporter.sendMail(mailOption);
};

module.exports = EmailSend;
