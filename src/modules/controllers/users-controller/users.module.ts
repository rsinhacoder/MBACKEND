//for testing purposes:
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  moleculus_countries as CountryEntity,
  moleculus_email_template as EmailEntity,
  moleculus_index_tokens as IndexTokensEntity,
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity,
  moleculus_states as StateEntity,
  moleculus_user_kyc as KYCEntity,
} from "src/modules/entities";
import { MailService } from "src/utils/mail/mail.service";
import { SMSService } from "src/utils/sms/sms.service";
import { moleculus_user as UserEntity } from "../../entities/user.entity";
import { moleculus_user_notification as NotificationEntity } from "../../entities/userNotification.entity";
import { UserNotificationsService } from "../user-noti-controller/user-notifications.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

import { moleculus_user_address as AddressEntity } from "../../entities/userAddress.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SIPTransactionsEntity,
      SIPEntity,
      StateEntity,
      CountryEntity,
      IndexTokensEntity,
      KYCEntity,
      NotificationEntity,
      AddressEntity,
      EmailEntity,
    ]),
  ],
  controllers: [UsersController],

  providers: [
    { provide: "USER_SERVICE", useClass: UsersService },
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
export class UsersModule {}
