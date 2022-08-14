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
exports.SettingsControllerController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const CreateSettting_dto_1 = require("../../dto/CreateSettting.dto");
const settings_entity_1 = require("../../entities/settings.entity");
const settings_service_1 = require("./settings.service");
let SettingsControllerController = class SettingsControllerController {
    constructor(settingsRepository, settingsService) {
        this.settingsRepository = settingsRepository;
        this.settingsService = settingsService;
    }
    async getAllSettings(res, settingKeyWord) {
        console.log("Inside Settings Controller");
        const settings = await this.settingsService.getAllSettings();
        if (settings) {
            return res.status(200).json({
                message: "All settings retrieved successfully.",
                settings: settings,
            });
        }
        else {
            res.status(400).json({
                message: "No settings found",
                settings: settings,
            });
        }
    }
    async getSetting(res, settingKeyWord) {
        common_1.Logger.log("Inside Settings Controller");
        const settings = await this.settingsService.getSettingKeyword(settingKeyWord);
        if (settings) {
            return res.status(200).json({
                message: `All settings of for thr Keyword: "${settingKeyWord}" retrieved successfully...`,
                settings: settings,
            });
        }
        else {
            res.status(400).json({
                message: "No settings found",
                settings: settings,
            });
        }
    }
    async createState(createSettingDto, res) {
        const new_setting = await this.settingsService.createSetting(createSettingDto);
        if (!new_setting || new_setting === null || new_setting === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Some Error Occured",
                data: {},
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Setting Created Successfully",
                data: {
                    setting_id: new_setting.setting_id,
                    setting_keyword: new_setting.setting_keyword,
                },
            });
        }
    }
    async deleteSetting(settingKeyWord, res) {
        const setting = await this.settingsService.getSettingKeyword;
        if (setting) {
            var setting_ = await this.settingsService.deleteSetting(settingKeyWord);
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Setting Deleted Successfully",
                data: {},
            });
        }
        else {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Some Error Occured",
                data: {},
            });
        }
    }
};
__decorate([
    (0, common_1.Get)("allsettings"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("settingKeyWord")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SettingsControllerController.prototype, "getAllSettings", null);
__decorate([
    (0, common_1.Get)("getsetting/:settingKeyWord"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("settingKeyWord")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SettingsControllerController.prototype, "getSetting", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSettting_dto_1.CreateSettingDto, Object]),
    __metadata("design:returntype", Promise)
], SettingsControllerController.prototype, "createState", null);
__decorate([
    (0, common_1.Delete)("delete/:settingKeyWord"),
    __param(0, (0, common_1.Param)("settingKeyWord")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SettingsControllerController.prototype, "deleteSetting", null);
SettingsControllerController = __decorate([
    (0, common_1.Controller)("settings"),
    __param(0, (0, typeorm_1.InjectRepository)(settings_entity_1.moleculus_settings)),
    __param(1, (0, common_1.Inject)("SETTINGS_SERVICE")),
    __metadata("design:paramtypes", [settings_entity_1.moleculus_settings,
        settings_service_1.SettingsService])
], SettingsControllerController);
exports.SettingsControllerController = SettingsControllerController;
//# sourceMappingURL=settings-controller.controller.js.map