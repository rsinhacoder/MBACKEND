import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserNotificationsModule } from "src/modules/controllers/user-noti-controller/user-notifications.module";
import { CommonCrudController } from "./common-crud/common-crud.controller";

import { moleculus_user as User } from "src/modules/entities/user.entity";

import { JwtModule, JwtService } from "@nestjs/jwt";
import {
  moleculus_email_template as EmailTemplateEntity,
  moleculus_pages as PagesEntity,
  moleculus_settings as SettingsEntity,
  moleculus_user_address as UserAddressEntity,
} from "src/modules/entities";
import { KyccontrollerController } from "./user-kyc/kyccontroller.controller";
import { moleculus_admin as AdminEntity } from "src/modules/entities/admin.entity";
import { moleculus_index_tokens as IndexTokensRepository } from "src/modules/entities/index_tokens.entity";
import { moleculus_login_log as LoginLogRepository } from "src/modules/entities/loginLog.entity";
import { moleculus_user_notification as UserNotificationsEntity } from "src/modules/entities";
import { moleculus_user as UserRepository } from "src/modules/entities/user.entity";
import { MailService } from "src/utils/mail/mail.service";
import { AdminAuthController } from "./auth/admin.auth.controller";
import { AdminAuthService } from "./auth/admin.auth.service";
import { CommonCrudService } from "./common-crud/common-crud.service";
import { EmailTemplateController } from "./email-template-controller/email-template.controller";
import { EmailTemplateService } from "./email-template-controller/email-template.service";
import { AdminIndexController } from "./indextokens/indextoken.auth.controller";
import { checkAdminAccessToken } from "./middlewares/checkAdminAccessToken.middleware";
import { checkAdminAuthToken } from "./middlewares/checkAdminAuthToken.middleware";
import { PagesController } from "./pages-controller/pages.controller";
import { PageService } from "./pages-controller/pages.service";
import {
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity,
  moleculus_countries as CountriesEntity,
  moleculus_states as StatesEntity,
  // moleculus_cities as CityEntity,
  moleculus_user_kyc as KycEntity,
} from "src/modules/entities";
import { KYCService } from "./user-kyc/kyc-service";
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
      CountriesEntity,
      StatesEntity,
      // CityEntity,
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
      signOptions: {}, //expiresIn: "30s"
    }),
  ],
  controllers: [
    CommonCrudController,
    PagesController,
    AdminAuthController,
    EmailTemplateController,
    AdminIndexController,
    KyccontrollerController,
    // UtilsController,
  ],

  providers: [
    {
      provide: "CRUD_SERVICE",
      useClass: CommonCrudService,
    },
    {
      provide: "MAIL_SERVICE",
      useClass: MailService,
    },
    {
      provide: "JWT_SERVICE",
      useClass: JwtService,
    },
    {
      provide: "PAGE_SERVICE",
      useClass: PageService,
    },
    {
      provide: "ADMIN_AUTH_SERVICE",
      useClass: AdminAuthService,
    },
    {
      provide: "EMAIL_TEMPLATE_SERVICE",
      useClass: EmailTemplateService,
    },
    {
      provide: "KYC_SERVICE",
      useClass: KYCService,
    },
    // {
    //   provide: "INDEX_TOKEN_SERVICE",
    //   useClass: AdminIndexController,
    // },
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkAdminAccessToken)
      .exclude(
        {
          path: "api/v1/users/(.*)",
          method: RequestMethod.ALL,
        },
        {
          path: "api/v1/usernotifications/(.*)",
          method: RequestMethod.ALL,
        },
        {
          path: "api/v1/settings/(.*)",
          method: RequestMethod.ALL,
        },
        { path: "api/v1/batchjobs/(.*)", method: RequestMethod.ALL }
      )
      .forRoutes("*");
    consumer
      .apply(checkAdminAuthToken)
      .exclude(
        {
          path: "api/v1/admin/auth/login",
          method: RequestMethod.ALL,
        },
        {
          path: "api/v1/admin/auth/check/email",
          method: RequestMethod.POST,
        },
        {
          path: "api/v1/admin/auth/sendmail",
          method: RequestMethod.POST,
        },
        {
          path: "api/v1/admin/auth/ping",
          method: RequestMethod.POST,
        },

        {
          path: "api/v1/admin/auth/register",
          method: RequestMethod.POST,
        },
        {
          path: "api/v1/users/(.*)",
          method: RequestMethod.ALL,
        },
        {
          path: "api/v1/usernotifications/(.*)",
          method: RequestMethod.ALL,
        },
        {
          path: "api/v1/admin/auth/verifyadmin/tfa",
          method: RequestMethod.POST,
        },
        {
          path: "api/v1/settings/(.*)",
          method: RequestMethod.ALL,
        },
        { path: "api/v1/batchjobs/(.*)", method: RequestMethod.ALL }
      )
      .forRoutes("*");
  }
}
