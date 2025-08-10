const nodemailer = require("nodemailer");
const EmailLogModel = require('../../models/EmailLogsModel');

const EmailSend = async (userId, template_id, EmailTo, EmailText, EmailSubject) => {
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
    // text: EmailText
    html: EmailText
  }

  try {
    await transporter.sendMail(mailOption);
    await EmailLogModel.create({
      template_id,
      user_id: userId,
      recipient_email: EmailTo,
      status: 'sent',
    });
    return { status: 'success', message: 'Email sent successfully' };
  } catch (error) {
    await EmailLogModel.create({
      template_id,
      user_id: userId,
      recipient_email: EmailTo,
      status: 'failed',
      error_message: error.message,
      sent_at: new Date(),
    });
    return { status: 'fail', message: error.message };
  }
};

module.exports = EmailSend;
