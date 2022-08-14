"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.EmailTemplateController = void 0;
var common_1 = require("@nestjs/common");
var EmailTemplateController = /** @class */ (function () {
    function EmailTemplateController(emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }
    EmailTemplateController.prototype.create = function (res, createEmailTemplateDto) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log(createEmailTemplateDto, "EmailTemplateService");
                        return [4 /*yield*/, this.emailTemplateService.create(createEmailTemplateDto)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Email-Template Created Successfully",
                                data: null
                            })];
                }
            });
        });
    };
    EmailTemplateController.prototype.getAllEmailTemplates = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var email_templates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailTemplateService.getAllEmailTemplates()];
                    case 1:
                        email_templates = _a.sent();
                        if (!email_templates ||
                            email_templates == null ||
                            email_templates == undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No Email templates Found ",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Email templates Found Successfully",
                                    data: email_templates
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateController.prototype.DeleteEmailTemplates = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var email_template_id, deleted_email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email_template_id = body.email_template_id;
                        return [4 /*yield*/, this.emailTemplateService.DeleteEmailTemplates(parseInt(email_template_id))];
                    case 1:
                        deleted_email = _a.sent();
                        if (!deleted_email ||
                            deleted_email === null ||
                            deleted_email === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Email-Template Deleted Successfully",
                                    data: []
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateController.prototype.viewEmailTemplate = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var email_template_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email_template_id = body.email_template_id;
                        return [4 /*yield*/, this.emailTemplateService.getEmailTemplateDetails(parseInt(email_template_id))];
                    case 1:
                        result = _a.sent();
                        if (!result || result == null || result == undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured, No such email template found",
                                    data: []
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    code: "200",
                                    status: "success",
                                    message: "Email-Template Found Successfully",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateController.prototype.update = function (email_template_id, res, updateEmailDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email_template_id_, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email_template_id_ = parseInt(email_template_id);
                        return [4 /*yield*/, this.emailTemplateService.update(updateEmailDto, email_template_id_)];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            common_1.Logger.log("No such email-template found");
                            return [2 /*return*/, res.status(400).json({
                                    code: "400",
                                    status: "error",
                                    message: "Error Occured ",
                                    data: null
                                })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                code: "200",
                                status: "success",
                                message: "Email-template Updated Successfully",
                                data: {}
                            })];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)("create"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], EmailTemplateController.prototype, "create");
    __decorate([
        (0, common_1.Get)("/getalltemplates"),
        __param(0, (0, common_1.Res)())
    ], EmailTemplateController.prototype, "getAllEmailTemplates");
    __decorate([
        (0, common_1.Post)("/delete"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], EmailTemplateController.prototype, "DeleteEmailTemplates");
    __decorate([
        (0, common_1.Post)("/viewemailtemplate"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], EmailTemplateController.prototype, "viewEmailTemplate");
    __decorate([
        (0, common_1.Put)("update/:id"),
        (0, common_1.UsePipes)(common_1.ValidationPipe),
        __param(0, (0, common_1.Param)("id")),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Body)())
    ], EmailTemplateController.prototype, "update");
    EmailTemplateController = __decorate([
        (0, common_1.Controller)("admin/email-template"),
        __param(0, (0, common_1.Inject)("EMAIL_TEMPLATE_SERVICE"))
    ], EmailTemplateController);
    return EmailTemplateController;
}());
exports.EmailTemplateController = EmailTemplateController;
