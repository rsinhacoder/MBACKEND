"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
require("dotenv").config({ debug: false });
const common_1 = require("@nestjs/common");
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
class MailService {
    constructor() { }
    async sendMailAWS(subject, message, to, from) {
        try {
            const email_response = await this.sesTest(to, from, subject, message);
        }
        catch (err) {
            return null;
        }
        return false;
    }
    async sesTest(to, from, subject, message) {
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
    async sendMail(subject, message, to) {
        common_1.Logger.log("Sending Mail to:  " + to + " ...");
        const mailOptions = {
            from: "support@moleculus.network",
            to: "rishabh.p@inheritx.com",
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
            }
            else {
                console.log("Email sent: " + info);
                return true;
            }
        });
        return true;
    }
}
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map