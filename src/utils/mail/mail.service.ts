require("dotenv").config({ debug: false });
import { Logger } from "@nestjs/common";
var aws = require("aws-sdk");
const ses = new aws.SES({ apiVersion: "2010-12-01", region: "us-east-1" });
const nodemailer = require("nodemailer");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_DEP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEP,
  region: "us-east-1",
});

const sesConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_DEP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_DEP,
  region: process.env.AWS_REGION,
};

export class MailService {
  constructor() {}

  async sendMailAWS(
    subject: string,
    message: string,
    to: string,
    from: string
  ) {
    try {
      const email_response = await this.sesTest(to, from, subject, message);
    } catch (err) {
      return null;
    }
    return false;
  }

  async sesTest(to: string, from: string, subject: string, message: string) {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Data: message,
            Charset: "UTF-8",
          },
        },
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
      },
      Source: from,
    };
    new aws.SES(sesConfig)
      .sendEmail(params)
      .promise()
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async sendMail(subject: string, message: string, to: string) {
    Logger.log("Sending Mail to:  " + to + " ...");
    const mailOptions = {
      from: "support@moleculus.network",
      to: "rishabh.p@inheritx.com",
      // to: to,
      subject: subject,
      text: message,
      html: message,
    };
    var smtpTransporter = await nodemailer.createTransport({
      PORT: 465,
      host: "email-smtp.us-east-1.amazonaws.com",
      secure: false,
      auth: {
        user: process.env.AWS_ACCESS_KEY_ID_DEP,
        pass: process.env.AWS_SECRET_ACCESS_KEY_DEP,
      },
      debug: true,
    });
    await smtpTransporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.error(error);
        return null;
      } else {
        console.log("Email sent: " + info);
        return true;
      }
    });
    return true;
  }
}
