import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AdminModule } from "./admin/admin.module";
import { BatchJobsModule } from "./batchjobs/batchjob.module";
import { checkAccessToken } from "./middlewares/checkAccessToken.middleware";
import { checkAuthToken } from "./middlewares/checkAuthToken.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { ControllerController } from "./modules/auth/controller/user_auth.controller";
import { PagesModule } from "./modules/controllers/pages-controller/pages.module";
import { SettingsModule } from "./modules/controllers/settings-controller/settings.module";
import { UserNotificationsModule } from "./modules/controllers/user-noti-controller/user-notifications.module";
import { UsersModule } from "./modules/controllers/users-controller/users.module";
import { UsersService } from "./modules/controllers/users-controller/users.service";
import entities, {
  // moleculus_cities,
  moleculus_countries,
  moleculus_index_tokens as IndexTokensEntity,
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity,
  moleculus_states,
  moleculus_user_kyc as KYCEntity,
  moleculus_email_template as EmailEntity,
} from "./modules/entities";
import { moleculus_login_log as LoginLogEntity } from "./modules/entities/loginLog.entity";
import { moleculus_user as UserEntity } from "./modules/entities/user.entity";
import { moleculus_user_address as addressRepository } from "./modules/entities/userAddress.entity";
import { moleculus_user_kyc as UserKYCEntity } from "./modules/entities/userKYC.entity";
import { moleculus_user_notification as UserNotificationEntity } from "./modules/entities/userNotification.entity";
import { MailService } from "./utils/mail/mail.service";
import { SMSService } from "./utils/sms/sms.service";
import { UtilsModule } from "./utils/utils.module";
const entities_app = [
  UserEntity,
  IndexTokensEntity,
  moleculus_states,
  moleculus_countries,
  SIPTransactionsEntity,
  LoginLogEntity,
  UserKYCEntity,
  KYCEntity,
  SIPEntity,
  addressRepository,
  UserNotificationEntity,
  EmailEntity,
];

require("dotenv").config({ path: ".env" }, { debug: false });

const app_imports = [
  TypeOrmModule.forFeature(entities_app),
  UsersModule,
  UtilsModule,
  SettingsModule,
  AdminModule,
  AuthModule,
  UserNotificationsModule,
  JwtModule,
  PagesModule,
  BatchJobsModule,
  TypeOrmModule.forRoot({
    type: "postgres",
    entities: entities,
    synchronize: true,
    url: process.env.DATABASE_URL_PROD,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
];

export const AppDataSource = new DataSource({
  type: "postgres",
  entities: entities,
  synchronize: true,
  url: process.env.DATABASE_URL_PROD,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

@Module({
  imports: app_imports,
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
      useClass: UsersService,
    },
  ],
  controllers: [ControllerController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAccessToken)
      .exclude(
        { path: "api/v1/admin/(.*)", method: RequestMethod.ALL },
        { path: "api/v1/batchjobs/(.*)", method: RequestMethod.ALL }
      )
      .forRoutes("*");
    consumer
      .apply(checkAuthToken)
      .exclude(
        { path: "api/v1/admin/(.*)", method: RequestMethod.ALL },
        {
          path: "api/v1/users/auth/login",
          method: RequestMethod.POST,
        },
        {
          path: "api/v1/users/pages/getpage/WELCOMEPAGE",
          method: RequestMethod.GET,
        },

        {
          path: "api/v1/users/reset/password",
          method: RequestMethod.PUT,
        },
        {
          path: "api/v1/users/register",
          method: RequestMethod.POST,
        },
        {
          path: "api/v1/users/auth/auth0",
          method: RequestMethod.POST,
        },
        { path: "api/v1/batchjobs/(.*)", method: RequestMethod.ALL }
      )
      .forRoutes("*");
  }
}
