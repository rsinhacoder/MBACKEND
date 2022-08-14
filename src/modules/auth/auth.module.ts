import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { moleculus_user_kyc as KYCEntity } from "src/modules/entities";
import { MailService } from "src/utils/mail/mail.service";
import { SMSService } from "src/utils/sms/sms.service";
import { UserNotificationsService } from "../controllers/user-noti-controller/user-notifications.service";
import { UsersController } from "../controllers/users-controller/users.controller";
import { UsersModule } from "../controllers/users-controller/users.module";
import { UsersService } from "../controllers/users-controller/users.service";
import { User as UserEntity } from "../entities";
import { moleculus_login_log as LoginLogEntity } from "../entities/loginLog.entity";
import { moleculus_user as UserRepository } from "../entities/user.entity";
import {
  moleculus_email_template as EmailEntity,
  moleculus_index_tokens as IndexTokensEntity,
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity,
} from "./../entities";
import { moleculus_admin } from "./../entities/admin.entity";
import { moleculus_cities as CityEntity } from "./../entities/cities.entity";
import { moleculus_countries as CountryEntity } from "./../entities/countries.entity";
import { moleculus_states as StateEntity } from "./../entities/states.entity";
import { moleculus_user_address as AddressEntity } from "./../entities/userAddress.entity";
import { moleculus_user_notification as NotificationEntity } from "./../entities/userNotification.entity";
import { ControllerController } from "./controller/user_auth.controller";

require("dotenv").config({ debug: false });

const entities_auth = [
  UserEntity,
  SIPTransactionsEntity,
  IndexTokensEntity,
  SIPEntity,
  CityEntity,
  IndexTokensEntity,
  StateEntity,
  LoginLogEntity,
  CountryEntity,
  moleculus_admin,
  UserEntity,
  KYCEntity,
  NotificationEntity,
  AddressEntity,
  UserRepository,
  EmailEntity,
];

@Module({
  imports: [
    TypeOrmModule.forFeature(entities_auth),
    UsersModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: "48000s" },
    }),
  ],
  controllers: [ControllerController, UsersController],
  providers: [
    {
      provide: "JWT_SERVICE",
      useValue: JwtService,
    },
    {
      provide: "USER_SERVICE",
      useClass: UsersService,
    },
    {
      provide: "SMS_SERVICE",
      useClass: SMSService,
    },
    {
      provide: "MAIL_SERVICE",
      useClass: MailService,
    },
    {
      provide: "NOTIFICATIONS_SERVICE",
      useClass: UserNotificationsService,
    },
  ],
})
export class AuthModule {}
