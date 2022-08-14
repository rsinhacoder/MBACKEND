"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.AppDataSource = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_module_1 = require("./admin/admin.module");
const batchjob_module_1 = require("./batchjobs/batchjob.module");
const checkAccessToken_middleware_1 = require("./middlewares/checkAccessToken.middleware");
const checkAuthToken_middleware_1 = require("./middlewares/checkAuthToken.middleware");
const auth_module_1 = require("./modules/auth/auth.module");
const user_auth_controller_1 = require("./modules/auth/controller/user_auth.controller");
const pages_module_1 = require("./modules/controllers/pages-controller/pages.module");
const settings_module_1 = require("./modules/controllers/settings-controller/settings.module");
const user_notifications_module_1 = require("./modules/controllers/user-noti-controller/user-notifications.module");
const users_module_1 = require("./modules/controllers/users-controller/users.module");
const users_service_1 = require("./modules/controllers/users-controller/users.service");
const entities_1 = require("./modules/entities");
const loginLog_entity_1 = require("./modules/entities/loginLog.entity");
const user_entity_1 = require("./modules/entities/user.entity");
const userAddress_entity_1 = require("./modules/entities/userAddress.entity");
const userKYC_entity_1 = require("./modules/entities/userKYC.entity");
const userNotification_entity_1 = require("./modules/entities/userNotification.entity");
const mail_service_1 = require("./utils/mail/mail.service");
const sms_service_1 = require("./utils/sms/sms.service");
const utils_module_1 = require("./utils/utils.module");
const entities_app = [
    user_entity_1.moleculus_user,
    entities_1.moleculus_index_tokens,
    entities_1.moleculus_states,
    entities_1.moleculus_countries,
    entities_1.moleculus_sip_transactions,
    loginLog_entity_1.moleculus_login_log,
    userKYC_entity_1.moleculus_user_kyc,
    entities_1.moleculus_user_kyc,
    entities_1.moleculus_sip,
    userAddress_entity_1.moleculus_user_address,
    userNotification_entity_1.moleculus_user_notification,
    entities_1.moleculus_email_template,
];
require("dotenv").config({ path: ".env" }, { debug: false });
const app_imports = [
    typeorm_1.TypeOrmModule.forFeature(entities_app),
    users_module_1.UsersModule,
    utils_module_1.UtilsModule,
    settings_module_1.SettingsModule,
    admin_module_1.AdminModule,
    auth_module_1.AuthModule,
    user_notifications_module_1.UserNotificationsModule,
    jwt_1.JwtModule,
    pages_module_1.PagesModule,
    batchjob_module_1.BatchJobsModule,
    typeorm_1.TypeOrmModule.forRoot({
        type: "postgres",
        entities: entities_1.default,
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
exports.AppDataSource = new typeorm_2.DataSource({
    type: "postgres",
    entities: entities_1.default,
    synchronize: true,
    url: process.env.DATABASE_URL_PROD,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(checkAccessToken_middleware_1.checkAccessToken)
            .exclude({ path: "api/v1/admin/(.*)", method: common_1.RequestMethod.ALL }, { path: "api/v1/batchjobs/(.*)", method: common_1.RequestMethod.ALL })
            .forRoutes("*");
        consumer
            .apply(checkAuthToken_middleware_1.checkAuthToken)
            .exclude({ path: "api/v1/admin/(.*)", method: common_1.RequestMethod.ALL }, {
            path: "api/v1/users/auth/login",
            method: common_1.RequestMethod.POST,
        }, {
            path: "api/v1/users/pages/getpage/WELCOMEPAGE",
            method: common_1.RequestMethod.GET,
        }, {
            path: "api/v1/users/reset/password",
            method: common_1.RequestMethod.PUT,
        }, {
            path: "api/v1/users/register",
            method: common_1.RequestMethod.POST,
        }, {
            path: "api/v1/users/auth/auth0",
            method: common_1.RequestMethod.POST,
        }, { path: "api/v1/batchjobs/(.*)", method: common_1.RequestMethod.ALL })
            .forRoutes("*");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: app_imports,
        providers: [
            {
                provide: "JWT_SERVICE",
                useValue: jwt_1.JwtService,
            },
            {
                provide: "USER_SERVICE",
                useClass: users_service_1.UsersService,
            },
            {
                provide: "SMS_SERVICE",
                useClass: sms_service_1.SMSService,
            },
            {
                provide: "MAIL_SERVICE",
                useClass: mail_service_1.MailService,
            },
            {
                provide: "NOTIFICATIONS_SERVICE",
                useClass: users_service_1.UsersService,
            },
        ],
        controllers: [user_auth_controller_1.ControllerController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map