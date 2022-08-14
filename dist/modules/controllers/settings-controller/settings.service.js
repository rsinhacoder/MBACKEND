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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const settings_entity_1 = require("../../entities/settings.entity");
let SettingsService = class SettingsService {
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async createSetting(createSettingDto) {
        common_1.Logger.log('Inside Setting Service Layer: "createSetting" ...');
        try {
            const setting = await this.settingRepository.create(createSettingDto);
            setting.created_datetime = new Date();
            setting.setting_keyword = createSettingDto.setting_keyword;
            return await this.settingRepository.save(setting);
        }
        catch (err) {
            common_1.Logger.error(err);
            return null;
        }
    }
    async editSetting(id, createSettingDto) {
        console.log('Inside Setting Service Layer: "editSetting" ...');
        const setting = await this.settingRepository.findOne({
            where: { setting_id: id },
        });
        if (setting) {
            const setting_ = this.settingRepository.merge(setting, createSettingDto);
            return await this.settingRepository.save(setting_);
        }
        else {
            return null;
        }
    }
    async getAllSettings() {
        common_1.Logger.log("Get All settings");
        const settings = await this.settingRepository.find({});
        return settings;
    }
    async getSetting(id) {
        console.log('Inside Setting Service Layer: "getSetting" ...');
        return await this.settingRepository.findOne({
            where: { setting_id: id },
        });
    }
    async getSettingKeyword(settingKeyWord) {
        const setting = await this.settingRepository.findOne({
            where: { setting_keyword: settingKeyWord },
        });
        if (setting) {
            return setting;
        }
        else {
            return null;
        }
    }
    async deleteSetting(settingKeyWord) {
        console.log('Inside Setting Service Layer: "deleteSetting" ...');
        const setting = await this.getSettingKeyword(settingKeyWord);
        if (setting) {
            setting.is_deleted = true;
            return await this.settingRepository.save(setting);
        }
        else {
            return null;
        }
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(settings_entity_1.moleculus_settings)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map