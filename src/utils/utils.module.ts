/* eslint-disable*/ /*prettier/prettier */

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserNotificationsModule } from "src/modules/controllers/user-noti-controller/user-notifications.module";
import { UserNotificationsService } from "src/modules/controllers/user-noti-controller/user-notifications.service";
import { UsersService } from "src/modules/controllers/users-controller/users.service";
import { moleculus_email_template as EmailEntity } from "src/modules/entities";
import { moleculus_user as User } from "src/modules/entities/user.entity";
import { MailService } from "./mail/mail.service";

import {
  moleculus_countries as CountryRepository,
  moleculus_pages as PagesEntity,
  moleculus_settings as SettingsEntity,
  moleculus_states as StateRepository,
  moleculus_user_address as AddressEntity,
  moleculus_user_kyc as KYCRepository,
  moleculus_user_notification as NotificationsRepository
} from "src/modules/entities";
import { SMSService } from "./sms/sms.service";

import {
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity
} from "src/modules/entities";

@Module({
  imports: [
    UserNotificationsModule,
    TypeOrmModule.forFeature([
      User,
      SIPTransactionsEntity,
      SIPEntity,
      NotificationsRepository,
      StateRepository,
      KYCRepository,
      CountryRepository,
      AddressEntity,
      PagesEntity,
      SettingsEntity,
      EmailEntity,
    ]),
  ],
  controllers: [],

  providers: [
    {
      provide: "MAIL_SERVICE",
      useClass: MailService,
    },
    {
      provide: "SMS_SERVICE",
      useClass: SMSService,
    },
    {
      provide: "USER_SERVICE",
      useClass: UsersService,
    },
    {
      provide: "NOTIFICATIONS_SERVICE",
      useClass: UserNotificationsService,
    },
  ],
})
export class UtilsModule {
  configure() {}
}
