import { Logger } from "@nestjs/common";
require("dotenv").config({ debug: false });
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_SNS,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SNS,
  region: process.env.AWS_REGION,
});

var sns = new AWS.SNS();

export class SMSService {
  constructor() {}

  async sendSMSAWS(message: string, to: string) {
    to = "+" + to;
    Logger.log("Sending SMS to:  " + to + " ...");

    sns.publish(
      {
        Message: message,
        PhoneNumber: to,
      },
      function (err, data) {
        if (err) {
          console.log(err, err.stack);
          return null;
        } else {
          console.log(data);
          return data;
        }
      }
    );

    return false;
  }
}
