"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_notifications_module_1 = require("../../../../../../../src/modules/controllers/user-noti-controller/user-notifications.module");
var common_crud_controller_1 = require("./common-crud/common-crud.controller");
var user_entity_1 = require("../../../../../../../src/modules/entities/user.entity");
var jwt_1 = require("@nestjs/jwt");
var entities_1 = require("../../../../../../../src/modules/entities");
var kyccontroller_controller_1 = require("./user-kyc/kyccontroller.controller");
var admin_entity_1 = require("../../../../../../../src/modules/entities/admin.entity");
var index_tokens_entity_1 = require("../../../../../../../src/modules/entities/index_tokens.entity");
var loginLog_entity_1 = require("../../../../../../../src/modules/entities/loginLog.entity");
var entities_2 = require("../../../../../../../src/modules/entities");
var user_entity_2 = require("../../../../../../../src/modules/entities/user.entity");
var mail_service_1 = require("../../../../../../../src/utils/mail/mail.service");
var admin_auth_controller_1 = require("./auth/admin.auth.controller");
var admin_auth_service_1 = require("./auth/admin.auth.service");
var common_crud_service_1 = require("./common-crud/common-crud.service");
var email_template_controller_1 = require("./email-template-controller/email-template.controller");
var email_template_service_1 = require("./email-template-controller/email-template.service");
var indextoken_auth_controller_1 = require("./indextokens/indextoken.auth.controller");
var checkAdminAccessToken_middleware_1 = require("./middlewares/checkAdminAccessToken.middleware");
var checkAdminAuthToken_middleware_1 = require("./middlewares/checkAdminAuthToken.middleware");
var pages_controller_1 = require("./pages-controller/pages.controller");
var pages_service_1 = require("./pages-controller/pages.service");
var entities_3 = require("../../../../../../../src/modules/entities");
var kyc_service_1 = require("./user-kyc/kyc-service");
require("dotenv").config({ debug: false });
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule.prototype.configure = function (consumer) {
        consumer
            .apply(checkAdminAccessToken_middleware_1.checkAdminAccessToken)
            .exclude({
            path: "api/v1/users/(.*)",
            method: common_1.RequestMethod.ALL
        }, {
            path: "api/v1/usernotifications/(.*)",
            method: common_1.RequestMethod.ALL
        }, {
            path: "api/v1/settings/(.*)",
            method: common_1.RequestMethod.ALL
        }, { path: "api/v1/batchjobs/(.*)", method: common_1.RequestMethod.ALL })
            .forRoutes("*");
        consumer
            .apply(checkAdminAuthToken_middleware_1.checkAdminAuthToken)
            .exclude({
            path: "api/v1/admin/auth/login",
            method: common_1.RequestMethod.ALL
        }, {
            path: "api/v1/admin/auth/check/email",
            method: common_1.RequestMethod.POST
        }, {
            path: "api/v1/admin/auth/sendmail",
            method: common_1.RequestMethod.POST
        }, {
            path: "api/v1/admin/auth/register",
            method: common_1.RequestMethod.POST
        }, {
            path: "api/v1/users/(.*)",
            method: common_1.RequestMethod.ALL
        }, {
            path: "api/v1/usernotifications/(.*)",
            method: common_1.RequestMethod.ALL
        }, {
            path: "api/v1/admin/auth/verifyadmin/tfa",
            method: common_1.RequestMethod.POST
        }, {
            path: "api/v1/settings/(.*)",
            method: common_1.RequestMethod.ALL
        }, { path: "api/v1/batchjobs/(.*)", method: common_1.RequestMethod.ALL })
            .forRoutes("*");
    };
    AdminModule = __decorate([
        (0, common_1.Module)({
            imports: [
                user_notifications_module_1.UserNotificationsModule,
                typeorm_1.TypeOrmModule.forFeature([
                    user_entity_1.moleculus_user,
                    entities_3.moleculus_user_kyc,
                    entities_1.moleculus_pages,
                    entities_3.moleculus_sip,
                    entities_3.moleculus_sip_transactions,
                    index_tokens_entity_1.moleculus_index_tokens,
                    entities_3.moleculus_countries,
                    entities_3.moleculus_states,
                    entities_3.moleculus_cities,
                    entities_1.moleculus_settings,
                    admin_entity_1.moleculus_admin,
                    entities_2.moleculus_user_notification,
                    entities_1.moleculus_email_template,
                    entities_1.moleculus_user_address,
                    loginLog_entity_1.moleculus_login_log,
                    user_entity_2.moleculus_user,
                ]),
                jwt_1.JwtModule.register({
                    secret: "".concat(process.env.JWT_SECRET),
                    signOptions: {}
                }),
            ],
            controllers: [
                common_crud_controller_1.CommonCrudController,
                pages_controller_1.PagesController,
                admin_auth_controller_1.AdminAuthController,
                email_template_controller_1.EmailTemplateController,
                indextoken_auth_controller_1.AdminIndexController,
                kyccontroller_controller_1.KyccontrollerController,
                // UtilsController,
            ],
            providers: [
                {
                    provide: "CRUD_SERVICE",
                    useClass: common_crud_service_1.CommonCrudService
                },
                {
                    provide: "MAIL_SERVICE",
                    useClass: mail_service_1.MailService
                },
                {
                    provide: "JWT_SERVICE",
                    useClass: jwt_1.JwtService
                },
                {
                    provide: "PAGE_SERVICE",
                    useClass: pages_service_1.PageService
                },
                {
                    provide: "ADMIN_AUTH_SERVICE",
                    useClass: admin_auth_service_1.AdminAuthService
                },
                {
                    provide: "EMAIL_TEMPLATE_SERVICE",
                    useClass: email_template_service_1.EmailTemplateService
                },
                {
                    provide: "KYC_SERVICE",
                    useClass: kyc_service_1.KYCService
                },
                // {
                //   provide: "INDEX_TOKEN_SERVICE",
                //   useClass: AdminIndexController,
                // },
            ]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
