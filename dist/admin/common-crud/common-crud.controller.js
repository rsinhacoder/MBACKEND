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
exports.CommonCrudController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../../utils/mail/mail.service");
const UpdateSetting_dto_1 = require("../dtos/UpdateSetting.dto");
const UpdateUserByAdminDto_1 = require("../dtos/UpdateUserByAdminDto");
const common_crud_service_1 = require("./common-crud.service");
let CommonCrudController = class CommonCrudController {
    constructor(mailService, commonCrudService) {
        this.mailService = mailService;
        this.commonCrudService = commonCrudService;
    }
    async getNotifications(res, userid) {
        common_1.Logger.log("Get all notifications");
        const result = await this.commonCrudService.getNotifications(parseInt(userid));
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                message: "No notifications found",
                code: "400",
                status: "error",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                message: "Notifications found",
                code: "200",
                status: "success",
                data: result,
            });
        }
    }
    async getUserKycDetails(res, body) {
        const { user_id } = body;
        const user_check = await this.commonCrudService.getUserDetailsById(user_id);
        var user_name = user_check.first_name.toUpperCase() +
            " " +
            user_check.last_name.toUpperCase();
        const email = user_check.email_id;
        const document_type = user_check.document_type;
        const document_value = user_check.document_value;
        const country_id = user_check.country_id;
        var country = "";
        country_id == 1 ? (country = "USA") : (country = "INDIA");
        if (!user_check || user_check == undefined || user_check == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error, No suh user present",
                data: null,
            });
        }
        const user_kyc = await this.commonCrudService.getUserKycDetails(user_id);
        if (!user_kyc || user_kyc == undefined || user_kyc == null) {
            return res.status(201).json({
                code: "201",
                status: "error",
                message: "NO_KYC_FOUND",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "User kyc details found",
                data: Object.assign(Object.assign({}, user_kyc), { user_name,
                    country,
                    email,
                    document_type,
                    document_value }),
            });
        }
    }
    async getUserSips(res, id) {
        const user_id = parseInt(id);
        const user = await this.commonCrudService.getUserSips(user_id);
        if (!user || user == null || user == undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error occured , No such user",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "User SIPs",
                data: user,
            });
        }
    }
    async getAllUsers() {
        common_1.Logger.log("Get all users");
        const result = await this.commonCrudService.getAllUsers();
        if (!result || result === null || result === undefined) {
            return result;
        }
        else {
            result.forEach((user) => {
                user.password = undefined;
                user.temp_secret
                    ? (user.temp_secret.base32 =
                        user.temp_secret.ascii =
                            user.temp_secret.hex =
                                undefined)
                    : "";
            });
            return result;
        }
    }
    async GetRepositoyEntriesCount2(res) {
        common_1.Logger.log("Get all users");
        const result = await this.commonCrudService.getCountOfRepositoryEntries2();
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting count of repository entries",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data found",
                data: result,
            });
        }
    }
    async getSIPByTokenCode(res, body) {
        var { token_code, user_id } = body;
        token_code = "MFV-50";
        const required_sip = await this.commonCrudService.getSipOfaUserByTokenCode(token_code, user_id);
        if (!required_sip || required_sip == undefined || required_sip == null) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No SIP found for given index token! ",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "SIP fetched for the user successfully",
                data: required_sip,
            });
        }
    }
    async update(res, id, updateUserByAdminDto) {
        var id_ = parseInt(id);
        const result = await this.commonCrudService.updateUserById(id_, updateUserByAdminDto);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "User updated successfully",
                data: null,
            });
        }
    }
    async updateSettings(res, updateSettingsDto) {
        const result = await this.commonCrudService.updateSettingsById(parseInt(updateSettingsDto.setting_id), updateSettingsDto);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in updating settings",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Settings updated successfully",
                data: null,
            });
        }
    }
    async getEnabledUsers(res) {
        const result = await this.commonCrudService.getEnabledUsers();
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting enabled users",
                data: 0,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Enabled Users Fetched Successfully",
                data: result,
            });
        }
    }
    async getStatesList(res, body) {
        const states = await this.commonCrudService.getStateList();
        if (!states || states === null || states === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting states",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "States Fetched Successfully",
                data: states,
            });
        }
    }
    async getCountryList(res) {
        const result = await this.commonCrudService.getCountryList();
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting country list",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Country List Fetched Successfully",
                data: result,
            });
        }
    }
    async changeUserDeleteStatus(res, body) {
        const { user_id } = body;
        const user_check = await this.commonCrudService.getUserDetailsById(user_id);
        if (!user_check || user_check === null || user_check === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured, No such user found",
                data: [],
            });
        }
        else {
            const result = await this.commonCrudService.changeUserDeleteStatus(parseInt(user_id));
            if (!result || result === null || result === undefined) {
                return res.status(400).json({
                    code: "400",
                    status: "error",
                    message: "Error Occured, No such user found",
                    data: [],
                });
            }
            else {
                return res.status(200).json({
                    code: "200",
                    status: "success",
                    message: "User Deleted Successfully",
                    data: result,
                });
            }
        }
    }
    async changeUserStatus(res, body) {
        const { user_id } = body;
        const user_check = await this.commonCrudService.getUserDetailsById(user_id);
        if (!user_check || user_check == null || user_check == undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting user",
                data: [],
            });
        }
        const result = await this.commonCrudService.changeUserStatus(user_id);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in changing user status",
                data: [],
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "User status changed successfully",
                data: null,
            });
        }
    }
    async getDisabledUsers(res) {
        const result = await this.commonCrudService.getDisabledUsers();
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting disabled users",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Disabled Users Fetched Successfully",
                data: result,
            });
        }
    }
    async getAllRecords(res, repository) {
        common_1.Logger.log("Get all records");
        const result = await this.commonCrudService.getAll(repository);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting all records",
                data: null,
            });
        }
        return res.status(200).json({
            code: "200",
            status: "success",
            message: "Data found successfully",
            data: result,
        });
    }
    async getAll(res, repository, id) {
        var id_ = parseInt(id);
        const result = await this.commonCrudService.getById(id_, repository);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured in getting all records of repository",
                data: null,
            });
        }
        else {
            result.created_datetime = result.created_ip = undefined;
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data found",
                data: result,
            });
        }
    }
    async getRepoContent(res, repository) {
        const result = await this.commonCrudService.getRepoContent(repository);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data found",
                data: result,
            });
        }
    }
    async toggleStatus(res, repository, id) {
        var id_ = parseInt(id);
        const result = await this.commonCrudService.updateStatus(id_, repository);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Status updated successfully",
                data: {},
            });
        }
    }
    async GetRepositoyEntriesCount(res, repository) {
        const result = await this.commonCrudService.getCountOfRepositoryEntries(repository);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data found",
                data: result,
            });
        }
    }
    async getAddressDetails(res, id) {
        var user_id = parseInt(id);
        const result = await this.commonCrudService.getAddressDetails(user_id);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data found",
                data: result,
            });
        }
    }
    async getUserById(res, id) {
        common_1.Logger.log("Get user by id");
        var id_ = parseInt(id);
        const result = await this.commonCrudService.getUserDetailsById(id_);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        else {
            result.password = undefined;
            result.authauth_o_response = undefined;
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data found",
                data: result,
            });
        }
    }
    async deleteSoft(res, repository, id) {
        var id_ = parseInt(id);
        const result = await this.commonCrudService.deleteSoft(id_, repository);
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                code: "400",
                status: "error",
                message: "Error Occured",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                code: "200",
                status: "success",
                message: "Data deleted successfully",
                data: {},
            });
        }
    }
};
__decorate([
    (0, common_1.Put)("/getusernotifications/:userid"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("userid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Post)("/getuserkycdetails"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getUserKycDetails", null);
__decorate([
    (0, common_1.Get)("getusersips/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getUserSips", null);
__decorate([
    (0, common_1.Get)("/allusers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)("/gettingcount"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "GetRepositoyEntriesCount2", null);
__decorate([
    (0, common_1.Post)("/getsipbytokencode"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getSIPByTokenCode", null);
__decorate([
    (0, common_1.Put)("/update/user/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateUserByAdminDto_1.UpdateUserByAdminDto]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("/update/settings"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateSetting_dto_1.UpdateSettingsDto]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Get)("/allenabledusers"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getEnabledUsers", null);
__decorate([
    (0, common_1.Post)("/getstateslist"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getStatesList", null);
__decorate([
    (0, common_1.Post)("/getcountrylist"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getCountryList", null);
__decorate([
    (0, common_1.Post)("/changeuserdeletestatus"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "changeUserDeleteStatus", null);
__decorate([
    (0, common_1.Post)("/changeuserstatus"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "changeUserStatus", null);
__decorate([
    (0, common_1.Get)("/alldisabledusers"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getDisabledUsers", null);
__decorate([
    (0, common_1.Get)("/:repository"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("repository")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getAllRecords", null);
__decorate([
    (0, common_1.Get)(":repository/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("repository")),
    __param(2, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(":repository/content"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("repository")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getRepoContent", null);
__decorate([
    (0, common_1.Get)("updateStatus/:repository/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("repository")),
    __param(2, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "toggleStatus", null);
__decorate([
    (0, common_1.Post)("/getcount/:repository"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("repository")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "GetRepositoyEntriesCount", null);
__decorate([
    (0, common_1.Put)("/addressdetails/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getAddressDetails", null);
__decorate([
    (0, common_1.Put)("/userdetails/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Delete)(":repository/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("repository")),
    __param(2, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CommonCrudController.prototype, "deleteSoft", null);
CommonCrudController = __decorate([
    (0, common_1.Controller)("admin/common"),
    __param(0, (0, common_1.Inject)("MAIL_SERVICE")),
    __param(1, (0, common_1.Inject)("CRUD_SERVICE")),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        common_crud_service_1.CommonCrudService])
], CommonCrudController);
exports.CommonCrudController = CommonCrudController;
//# sourceMappingURL=common-crud.controller.js.map