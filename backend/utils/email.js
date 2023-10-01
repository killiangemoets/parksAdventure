const nodemailer = require('nodemailer');
const ejs = require('ejs');

const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user) {
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.firstname = user.firstname;
    this.fullname = `${user.firstname} ${user.lastname}`;
    this.websiteUrl = process.env.WEBSITE_URL;
    this.contactUrl = process.env.CONTACT_URL;
    this.from = `Parks Adventure Hiking Tours <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgird
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGIRD_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, data) {
    // 1) Render HTML based on a ejs template
    const filePath = `${__dirname}/../views/email/${template}.ejs`;
    const html = await ejs.renderFile(filePath, {
      email: this.email,
      phoneNumber: this.phoneNumber,
      firstname: this.firstname,
      fullname: this.fullname,
      websiteUrl: this.websiteUrl,
      contactUrl: this.contactUrl,
      ...data,
    });

    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to:
        template === 'contact'
          ? [process.env.EMAIL_CONTACT_TO, process.env.EMAIL_FROM]
          : this.email,
      subject,
      html,
      text: htmlToText(html), // convert the html to text
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendVerificationEmail(url) {
    await this.send(
      'verification',
      'Welcome to the National Parks Hiking Tours Family!',
      { url }
    );
  }

  async sendGuideVerificationEmail(url) {
    await this.send(
      'guide-verification',
      'Welcome to the National Parks Hiking Tours Family!',
      { url }
    );
  }

  async sendBookingEmail({ url, bookings }) {
    await this.send('booking', 'Thank you for your reservation!', {
      url,
      bookings,
    });
  }

  async sendPasswordResetEmail(url) {
    await this.send(
      'passwordReset',
      `Your password reset token (valid for only ${process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN} minutes)`,
      { url }
    );
  }

  async sendContactEmail(message) {
    await this.send('contact', `Someone contacted you!`, { message });
  }
};
