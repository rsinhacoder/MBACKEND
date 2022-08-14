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
exports.CommonCrudService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../modules/entities");
const pages_entity_1 = require("../../modules/entities/pages.entity");
const settings_entity_1 = require("../../modules/entities/settings.entity");
const user_entity_1 = require("../../modules/entities/user.entity");
const userNotification_entity_1 = require("../../modules/entities/userNotification.entity");
const entities_2 = require("./../../modules/entities");
const email_template_entity_1 = require("./../../modules/entities/email-template.entity");
const loginLog_entity_1 = require("./../../modules/entities/loginLog.entity");
const pages_entity_2 = require("./../../modules/entities/pages.entity");
const settings_entity_2 = require("./../../modules/entities/settings.entity");
const user_entity_2 = require("./../../modules/entities/user.entity");
require("dotenv").config({ debug: false });
let CommonCrudService = class CommonCrudService {
    constructor(indexTokenRepository, notificationRepository, countryRepository, addressRpository, loginLogRepository, sipRepository, sipTransactionsRepository, pagesRepository, settingsRepository, userRepository, emailTemplateEntity, stateRepository, kycRepository) {
        this.indexTokenRepository = indexTokenRepository;
        this.notificationRepository = notificationRepository;
        this.countryRepository = countryRepository;
        this.addressRpository = addressRpository;
        this.loginLogRepository = loginLogRepository;
        this.sipRepository = sipRepository;
        this.sipTransactionsRepository = sipTransactionsRepository;
        this.pagesRepository = pagesRepository;
        this.settingsRepository = settingsRepository;
        this.userRepository = userRepository;
        this.emailTemplateEntity = emailTemplateEntity;
        this.stateRepository = stateRepository;
        this.kycRepository = kycRepository;
    }
    async changeUserDeleteStatus(user_id) {
        common_1.Logger.log(`Changing user delete status by user_id : ${user_id} }`, "CommonCrudService");
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: user_id },
            });
            if (user.is_deleted == user_entity_2.is_deleted_Enum.Yes) {
                user.is_deleted = user_entity_2.is_deleted_Enum.No;
                await this.userRepository.save(user);
            }
            else if (user.is_deleted == user_entity_2.is_deleted_Enum.No) {
                user.is_deleted = user_entity_2.is_deleted_Enum.Yes;
                await this.userRepository.save(user);
            }
            return await this.userRepository.save(user);
        }
        catch (err) {
            common_1.Logger.error(err, "CommonCrudService");
            return null;
        }
    }
    async getUserKycDetails(user_id) {
        common_1.Logger.log(`Getting user kyc details by user_id : ${user_id} }`, "CommonCrudService");
        try {
            const kyc_details = await this.kycRepository.findOne({
                where: { kyc_user_id: user_id },
                order: { kyc_id: "DESC" },
            });
            if (!kyc_details || kyc_details === null || kyc_details === undefined) {
                return null;
            }
            return kyc_details;
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getStateList() {
        common_1.Logger.log(`Getting state list`, "CommonCrudService");
        try {
            const states = await this.stateRepository.find({
                order: { state_country_id: "DESC", state_name: "ASC" },
            });
            return states;
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getCountryList() {
        const countries = await this.countryRepository.find({
            order: { country_name: "ASC" },
        });
        return countries;
    }
    async changeUserStatus(user_id) {
        common_1.Logger.log(`Changing user status by user_id : ${user_id} }`, "CommonCrudService");
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: user_id },
            });
            if (!user || user === null || user === undefined) {
                return null;
            }
            else {
                if (user.status == user_entity_1.status_Enum.Enable) {
                    user.status = user_entity_1.status_Enum.Disable;
                    await this.userRepository.save(user);
                    user.password = "";
                    return user;
                }
                if (user.status == user_entity_1.status_Enum.Disable) {
                    user.status = user_entity_1.status_Enum.Enable;
                    await this.userRepository.save(user);
                    user.password = "";
                    return user;
                }
            }
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getSipOfaUserByTokenCode(token_code, user_id) {
        common_1.Logger.log(`Getting sip details by token_code : ${token_code}`, "CommonCrudService");
        try {
            const sip = await this.sipTransactionsRepository.find({
                where: { token_code: token_code, tra_user_id: user_id },
            });
            if (!sip || sip === null || sip === undefined) {
                return null;
            }
            else {
                return sip;
            }
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getUserSips(user_id) {
        common_1.Logger.log(`Getting user sips by user_id : ${user_id}`, "CommonCrudService");
        try {
            const user_sips = await this.sipRepository.find({
                where: { sip_user_id: user_id },
            });
            return user_sips;
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getNotifications(user_id) {
        common_1.Logger.log(`Getting User Notifications by user_id: ${user_id}`, "CommonCrudService");
        const user_check = await this.userRepository.findOne({
            where: { user_id: user_id },
        });
        if (!user_check || user_check === null || user_check === undefined) {
            return null;
        }
        else {
            try {
                const notifications = await this.notificationRepository.findOne({
                    where: { noti_user_id: user_id },
                });
                if (!notifications ||
                    notifications === null ||
                    notifications === undefined) {
                    return null;
                }
                else {
                    return notifications;
                }
            }
            catch (err) {
                common_1.Logger.log("Error", "UserService");
                return null;
            }
        }
    }
    async getCountOfRepositoryEntries2() {
        common_1.Logger.log(`Getting Repository entries count of`, "CommonCrudService");
        try {
            var pageresult = await this.pagesRepository.count();
            var settingresult = await this.settingsRepository.count();
            var emailresult = await this.emailTemplateEntity.count({
                where: { is_deleted: false },
            });
            var tokenresult = await this.indexTokenRepository.count();
            var totalusersresult = await this.userRepository.count();
            var totalusersresultindia = await this.userRepository.count({
                where: { country_id: 2 },
            });
            var enableuserresultIndia = await this.userRepository.count({
                where: {
                    status: user_entity_1.status_Enum.Enable,
                    country_id: 2,
                },
            });
            var disableuserresultIndia = await this.userRepository.count({
                where: {
                    status: user_entity_1.status_Enum.Disable,
                    country_id: 2,
                },
            });
            var totalusersresultusa = await this.userRepository.count({
                where: { country_id: 1 },
            });
            var enableuserresultusa = await this.userRepository.count({
                where: {
                    status: user_entity_1.status_Enum.Enable,
                    country_id: 1,
                },
            });
            var enableusersusa2 = await this.userRepository
                .createQueryBuilder("user")
                .where("user.status = :status", { status: user_entity_1.status_Enum.Enable })
                .andWhere("user.country_id = :country_id", {
                country_id: 1,
            })
                .getCount();
            var disableuserresultusa = await this.userRepository.count({
                where: {
                    status: user_entity_1.status_Enum.Disable,
                    country_id: 1,
                },
            });
            var disableuserresult = await this.userRepository.count({
                where: { status: user_entity_1.status_Enum.Disable },
            });
            return {
                pageresult: pageresult,
                settingresult: settingresult,
                emailresult: emailresult,
                totalusersresultindia: enableuserresultIndia + disableuserresultIndia,
                enableuserresultIndia: enableuserresultIndia,
                disableuserresultindia: disableuserresultIndia,
                totalusersresultusa: enableuserresultusa + disableuserresultusa,
                enableuserresultusa: enableusersusa2,
                disableuserresultusa: disableuserresultusa,
                disableuserresult: disableuserresult,
                tokenresult: tokenresult,
                totalusersresult: totalusersresult,
            };
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getById(id, repository) {
        common_1.Logger.warn(`Getting ${repository} Repository entry by id: ${id}`, "CommonCrudService");
        let result;
        if (repository === "pages" || repository === "pages_entity") {
            try {
                result = await this.pagesRepository.findOne({
                    where: { pagetitle_id: id },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "settings" || repository === "settings_entity") {
            try {
                result = await this.settingsRepository.findOne({
                    where: { setting_id: id },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "email_templates" ||
            repository === "email_templates_entity") {
            try {
                result = await this.emailTemplateEntity.findOne({
                    where: { email_template_id: id },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
    }
    async getAddressDetails(id) {
        common_1.Logger.log(`Getting address details by id --: ${id}`, "CommonCrudService");
        try {
            const address = await this.addressRpository.findOne({
                where: { user_address_id: id },
            });
            return address;
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async getAllUsers() {
        try {
            return this.userRepository.find({
                order: { user_id: "DESC" },
            });
        }
        catch (err) {
            common_1.Logger.log("Error", "UserService");
            return null;
        }
    }
    async getUserDetailsById(id) {
        common_1.Logger.log(`Getting User Details by id: ${id}`, "CommonCrudService");
        let result;
        try {
            result = await this.userRepository.findOne({
                where: { user_id: id },
            });
            common_1.Logger.log(`User Details by id: ${id} Got`, "CommonCrudService");
            return result;
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
    }
    async updateUserById(id, data) {
        common_1.Logger.log(`Updating user by id: ${id} with data: ${JSON.stringify(data)}`, "CommonCrudService");
        try {
            const user = await this.userRepository.findOne({
                where: { user_id: id },
            });
            if (user) {
                if (data.first_name != null) {
                    user.first_name = data.first_name;
                }
                if (data.last_name != null) {
                    user.last_name = data.last_name;
                }
                if (data.email != null) {
                    user.email_id = data.email;
                }
                if (data.mobileNumber != null) {
                    user.phone_number = data.mobileNumber;
                }
                if (data.dob != null) {
                    user.dob = data.dob;
                }
                if (data.tin != null) {
                    user.tin = data.tin;
                }
                if (data.citizenship != null) {
                    user.citizenship = data.citizenship;
                }
                if (data.zipcode != null) {
                    user.zipcode = data.zipcode;
                }
                if (data.city != null) {
                    user.city = data.city;
                }
                if (data.state != null) {
                    user.state_name = data.state;
                }
                await this.userRepository.save(user);
                const user_address = await this.addressRpository.findOne({
                    where: { user_address_id: id },
                });
                if (user_address) {
                    if (data.address1 != null) {
                        user_address.address_line1 = data.address1;
                    }
                    if (data.address2 != null) {
                        user_address.address_line2 = data.address2;
                    }
                    if (data.other_info != null) {
                        user_address.other_info = data.other_info;
                    }
                    await this.addressRpository.save(user_address);
                }
                return user;
            }
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
        return true;
    }
    async updateSettingsById(id, updateSettingDto) {
        common_1.Logger.log(`Updating settings by id: ${id} )}`, "CommonCrudService");
        try {
            const settings = await this.settingsRepository.findOne({
                where: { setting_id: id },
            });
            if (settings) {
                if (updateSettingDto.setting_value != null) {
                    settings.setting_value = updateSettingDto.setting_value;
                }
                await this.settingsRepository.save(settings);
                return settings;
            }
        }
        catch (e) {
            common_1.Logger.error(e, "CommonCrudService");
            return null;
        }
        return true;
    }
    async getEnabledUsers() {
        try {
            return this.userRepository.count({
                where: { status: user_entity_1.status_Enum.Enable },
            });
        }
        catch (err) {
            common_1.Logger.log("Error", "UserService");
            return null;
        }
    }
    async getDisabledUsers() {
        try {
            return this.userRepository.count({
                where: { status: user_entity_1.status_Enum.Disable },
            });
        }
        catch (err) {
            common_1.Logger.log("Error", "UserService");
            return null;
        }
    }
    async getAll(repository) {
        common_1.Logger.log(`Getting ${repository} Repository entries`, "CommonCrudService");
        let result;
        if (repository === "pages" || repository === "pages_entity") {
            try {
                result = await this.pagesRepository.find({
                    order: {
                        pagetitle_id: "ASC",
                    },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "settings" || repository === "settings_entity") {
            try {
                result = await this.settingsRepository.find({
                    order: {
                        setting_id: "ASC",
                    },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "email_templates" ||
            repository === "email_templates_entity") {
            try {
                result = await this.emailTemplateEntity.find({
                    order: {
                        email_template_id: "ASC",
                    },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        else {
            common_1.Logger.error(`${repository} Repository not found`, "CommonCrudService");
            return null;
        }
    }
    async getRepoContent(repository) {
        common_1.Logger.warn(`Getting ${repository} Repository's content`, "CommonCrudService");
        let result;
        if (repository === "pages" || repository === "pages_entity") {
            try {
                result = await this.pagesRepository.find({});
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "settings" || repository === "settings_entity") {
            try {
                result = await this.settingsRepository.find({});
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "email_templates" ||
            repository === "email_templates_entity") {
            try {
                result = await this.settingsRepository.find({});
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "login_log" || repository === "login_log_entity") {
            try {
                result = await this.loginLogRepository.find({
                    order: {
                        log_in_datetime: "DESC",
                    },
                });
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
    }
    async updateStatus(id, repository) {
        common_1.Logger.warn(`Updating ${repository} Repository's status entry by id: ${id}`, "CommonCrudService");
        let result;
        if (repository === "pages" || repository === "pages_entity") {
            try {
                result = await this.pagesRepository.findOne({
                    where: { pagetitle_id: id },
                });
                if (!result.page_status || result.page_status === null) {
                    return null;
                }
                if (result.page_status === pages_entity_2.page_status_enum.Enable) {
                    result.page_status = pages_entity_2.page_status_enum.Disable;
                    return await this.pagesRepository.save(result);
                }
                if (result.page_status === pages_entity_2.page_status_enum.Disable) {
                    result.page_status = pages_entity_2.page_status_enum.Enable;
                    return await this.pagesRepository.save(result);
                }
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "settings" || repository === "settings_entity") {
            try {
                result = await this.settingsRepository.findOne({
                    where: { setting_id: id },
                });
                if (!result.setting_status || result.setting_status === null) {
                    return null;
                }
                if (result.setting_status === settings_entity_2.setting_status_enum.Enable) {
                    result.setting_status = settings_entity_2.setting_status_enum.Disable;
                    return await this.settingsRepository.save(result);
                }
                if (result.setting_status === settings_entity_2.setting_status_enum.Disable) {
                    result.setting_status = settings_entity_2.setting_status_enum.Enable;
                    return await this.settingsRepository.save(result);
                }
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
    }
    async deleteSoft(id, repository) {
        common_1.Logger.log(`Deleting ${repository} Repository entry by id: ${id}`, "CommonCrudService");
        let result;
        if (repository === "pages" || repository === "pages_entity") {
            try {
                result = await this.pagesRepository.findOne({
                    where: { pagetitle_id: id },
                });
                result.is_deleted = true;
                return await this.pagesRepository.save(result);
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "settings" || repository === "settings_entity") {
            try {
                result = await this.settingsRepository.findOne({
                    where: { setting_id: id },
                });
                result.is_deleted = true;
                return await this.settingsRepository.save(result);
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "email_templates" ||
            repository === "email_templates_entity") {
            try {
                result = await this.settingsRepository.findOne({
                    where: { setting_id: id },
                });
                result.is_deleted = true;
                return await this.settingsRepository.save(result);
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
    }
    async getCountOfRepositoryEntries(repository) {
        common_1.Logger.log(`Getting Repository entries count of ${repository}`, "CommonCrudService");
        let result;
        if (repository === "pages" || repository === "pages_entity") {
            try {
                result = await this.pagesRepository.count();
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "settings" || repository === "settings_entity") {
            try {
                result = await this.settingsRepository.count();
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        if (repository === "email_templates" ||
            repository === "email_templates_entity") {
            try {
                result = await this.emailTemplateEntity.count();
                return result;
            }
            catch (e) {
                common_1.Logger.error(e, "CommonCrudService");
                return null;
            }
        }
        common_1.Logger.error(`${repository} Repository not found`, "CommonCrudService");
        return null;
    }
};
CommonCrudService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_2.moleculus_index_tokens)),
    __param(1, (0, typeorm_1.InjectRepository)(userNotification_entity_1.moleculus_user_notification)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.moleculus_countries)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_2.moleculus_user_address)),
    __param(4, (0, typeorm_1.InjectRepository)(loginLog_entity_1.moleculus_login_log)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.moleculus_sip_transactions)),
    __param(7, (0, typeorm_1.InjectRepository)(pages_entity_1.moleculus_pages)),
    __param(8, (0, typeorm_1.InjectRepository)(settings_entity_1.moleculus_settings)),
    __param(9, (0, typeorm_1.InjectRepository)(user_entity_2.moleculus_user)),
    __param(10, (0, typeorm_1.InjectRepository)(email_template_entity_1.moleculus_email_template)),
    __param(11, (0, typeorm_1.InjectRepository)(entities_1.moleculus_states)),
    __param(12, (0, typeorm_1.InjectRepository)(entities_2.moleculus_user_kyc)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommonCrudService);
exports.CommonCrudService = CommonCrudService;
//# sourceMappingURL=common-crud.service.js.map