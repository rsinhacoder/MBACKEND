// import { Body, Controller, Inject, Logger, Post, Res } from "@nestjs/common";
// import { Response } from "express";
// import { UsersService } from "src/modules/controllers/users-controller/users.service";
// import { MailService } from "./mail.service";
// @Controller("email")
// export class MailController {
//   constructor(
//     @Inject("MAIL_SERVICE") private readonly mailService: MailService,
//     @Inject("USER_SERVICE") private readonly usersService: UsersService
//   ) {}
//   async sendMail(@Body() body, @Res() res: Response) {
//     Logger.log("sending Mail ...");
//     const message = "Message to be provided here";
//     const subject = "Subject to be provided here";
//     const to = body.email_id;
//     const from = "moleculus@gmail.com";
//     const user = await this.usersService.findUserByEmail(to);
//     if (!user || user == null || user === undefined) {
//       Logger.log("User not found");
//       return res.status(400).json({
//         code: 400,
//         status: "error",
//         message: `User with email: ${to} not found`,
//         data: null,
//       });
//     }
//     try {
//       const mail_info = await this.mailService.sendMailAWS(
//         subject,
//         message,
//         to,
//         from
//       );
//       if (mail_info) {
//         return res.status(200).json({
//           code: 200,
//           status: "success",
//           message: "Mail sent successfully",
//           data: {
//             to: to,
//             info: mail_info,
//           },
//         });
//       } else {
//         return res.status(400).json({
//           code: 400,
//           status: "error",
//           message: "Mail not sent",
//           data: mail_info,
//         });
//       }
//     } catch (error) {
//       return res.status(201).json({
//         code: 400,
//         status: "error",
//         message: "Message has not been sent !",
//         error: error,
//       });
//     }
//   }
// }
