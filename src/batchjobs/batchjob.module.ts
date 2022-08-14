import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserNotificationsModule } from "src/modules/controllers/user-noti-controller/user-notifications.module";
import { moleculus_user as User } from "src/modules/entities/user.entity";
import { CommonCrudController } from "../admin/common-crud/common-crud.controller";
import { BatchJobService } from "./services/batchjob.service";

import { JwtModule } from "@nestjs/jwt";
import {
  moleculus_email_template as EmailTemplateEntity,
  moleculus_pages as PagesEntity,
  moleculus_settings as SettingsEntity,
  moleculus_user_address as UserAddressEntity,
} from "src/modules/entities";

import { moleculus_user_notification as UserNotificationsEntity } from "src/modules/entities";
import { moleculus_admin as AdminEntity } from "src/modules/entities/admin.entity";
import { moleculus_index_tokens as IndexTokensRepository } from "src/modules/entities/index_tokens.entity";
import { moleculus_login_log as LoginLogRepository } from "src/modules/entities/loginLog.entity";
import { moleculus_user as UserRepository } from "src/modules/entities/user.entity";

import {
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity,
  moleculus_user_kyc as KycEntity,
} from "src/modules/entities";
import { BatchJobController } from "./controllers/batchjob.controller";

require("dotenv").config({ debug: false });

@Module({
  imports: [
    UserNotificationsModule,
    TypeOrmModule.forFeature([
      User,
      KycEntity,
      PagesEntity,
      SIPEntity,
      SIPTransactionsEntity,
      IndexTokensRepository,
      SettingsEntity,
      AdminEntity,
      UserNotificationsEntity,
      EmailTemplateEntity,
      UserAddressEntity,
      LoginLogRepository,
      UserRepository,
    ]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {},
    }),
  ],
  controllers: [BatchJobController],

  providers: [
    {
      provide: "BATCH_JOB_SERVICE",
      useClass: BatchJobService,
    },
  ],
})
export class BatchJobsModule {}
