"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BatchJobsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_notifications_module_1 = require("../../../../../../../src/modules/controllers/user-noti-controller/user-notifications.module");
var user_entity_1 = require("../../../../../../../src/modules/entities/user.entity");
var batchjob_service_1 = require("./services/batchjob.service");
var jwt_1 = require("@nestjs/jwt");
var entities_1 = require("../../../../../../../src/modules/entities");
var entities_2 = require("../../../../../../../src/modules/entities");
var admin_entity_1 = require("../../../../../../../src/modules/entities/admin.entity");
var index_tokens_entity_1 = require("../../../../../../../src/modules/entities/index_tokens.entity");
var loginLog_entity_1 = require("../../../../../../../src/modules/entities/loginLog.entity");
var user_entity_2 = require("../../../../../../../src/modules/entities/user.entity");
var entities_3 = require("../../../../../../../src/modules/entities");
var batchjob_controller_1 = require("./controllers/batchjob.controller");
require("dotenv").config({ debug: false });
var BatchJobsModule = /** @class */ (function () {
    function BatchJobsModule() {
    }
    BatchJobsModule = __decorate([
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
            controllers: [batchjob_controller_1.BatchJobController],
            providers: [
                {
                    provide: "BATCH_JOB_SERVICE",
                    useClass: batchjob_service_1.BatchJobService
                },
            ]
        })
    ], BatchJobsModule);
    return BatchJobsModule;
}());
exports.BatchJobsModule = BatchJobsModule;
