"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchJobController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const batchjob_service_1 = require("../services/batchjob.service");
const schedule = require("node-schedule");
let BatchJobController = class BatchJobController {
    constructor(batchJobService) {
        this.batchJobService = batchJobService;
        this.job1 = schedule.scheduleJob("5 15 0 0 * *", async function jobone() {
            const r = await axios_1.default.post("https://nestjs-moleculus-ris-2107.vercel.app/api/v1/batchjobs/testjob", { user_id: "59", data: "Sample" });
            console.log("####################-The task runs at 00:00:15 -######################");
            console.log(await r.data);
        });
    }
    async getBatchJob(res, body) {
        common_1.Logger.log("getBatchJob", "BatchJobController");
        console.log(body);
        const result = await this.batchJobService.getBatchJob(body.user_id);
        if (!result || result == null || result == undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "user not found",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "user found",
                data: result,
            });
        }
    }
    async ptint() {
        console.log("print");
    }
};
__decorate([
    (0, common_1.Post)("/testjob"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BatchJobController.prototype, "getBatchJob", null);
BatchJobController = __decorate([
    (0, common_1.Controller)("/batchjobs"),
    __param(0, (0, common_1.Inject)("BATCH_JOB_SERVICE")),
    __metadata("design:paramtypes", [batchjob_service_1.BatchJobService])
], BatchJobController);
exports.BatchJobController = BatchJobController;
//# sourceMappingURL=batchjob.controller.js.map