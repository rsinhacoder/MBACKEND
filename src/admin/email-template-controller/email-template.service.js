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
exports.EmailTemplateService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var axios_1 = require("axios");
var email_template_entity_1 = require("../../modules/entities/email-template.entity");
require("dotenv").config({ debug: false });
var EmailTemplateService = /** @class */ (function () {
    function EmailTemplateService(emailRepository) {
        this.emailRepository = emailRepository;
    }
    EmailTemplateService.prototype.getAllEmailTemplates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var emails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailRepository.find({
                            where: { is_deleted: false },
                            order: { email_template_id: "DESC" }
                        })];
                    case 1:
                        emails = _a.sent();
                        if (!emails || emails == null || emails == undefined) {
                            return [2 /*return*/, null];
                        }
                        else {
                            return [2 /*return*/, emails];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateService.prototype.DeleteEmailTemplates = function (email_template_id) {
        return __awaiter(this, void 0, void 0, function () {
            var email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailRepository.findOne({
                            where: { email_template_id: email_template_id }
                        })];
                    case 1:
                        email = _a.sent();
                        if (!(!email || email == null || email == undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, null];
                    case 2:
                        email.is_deleted = true;
                        return [4 /*yield*/, this.emailRepository.save(email)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    EmailTemplateService.prototype.getEmailTemplateDetails = function (email_template_id) {
        return __awaiter(this, void 0, void 0, function () {
            var email_template_details, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.emailRepository.findOne({
                                where: { email_template_id: email_template_id, is_deleted: false }
                            })];
                    case 1:
                        email_template_details = _a.sent();
                        if (!email_template_details || email_template_details === null) {
                            common_1.Logger.error("Email Template Not Found", "PageService");
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, email_template_details];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        common_1.Logger.error(error_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateService.prototype.create = function (createEmailTemplateDto) {
        return __awaiter(this, void 0, void 0, function () {
            var new_page, req_data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        new_page = this.emailRepository.create(createEmailTemplateDto);
                        new_page.created_datetime = new Date();
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                req_data: "";
                            })];
                    case 1:
                        req_data = _a.sent();
                        new_page.created_ip = req_data.ip || "";
                        new_page.email_title = createEmailTemplateDto.email_title;
                        new_page.description = createEmailTemplateDto.description;
                        new_page.email_keyword = createEmailTemplateDto.email_keyword;
                        new_page.email_variable = createEmailTemplateDto.email_variable;
                        new_page.subject = createEmailTemplateDto.subject;
                        return [4 /*yield*/, this.emailRepository.save(new_page)];
                    case 2:
                        _a.sent();
                        common_1.Logger.log("Email Template Successfully", "PageService");
                        return [2 /*return*/, true];
                    case 3:
                        error_2 = _a.sent();
                        common_1.Logger.error(error_2);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateService.prototype.update = function (updateEmailDto, email_template_id_) {
        return __awaiter(this, void 0, void 0, function () {
            var update_page, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.emailRepository.findOne({
                                where: { email_template_id: email_template_id_ }
                            })];
                    case 1:
                        update_page = _a.sent();
                        if (!(!update_page || update_page === null || update_page === undefined)) return [3 /*break*/, 2];
                        common_1.Logger.error("Email Template Not Found", "PageService");
                        return [2 /*return*/, false];
                    case 2:
                        update_page.email_title = updateEmailDto.email_title;
                        update_page.description = updateEmailDto.description;
                        update_page.subject = updateEmailDto.subject;
                        return [4 /*yield*/, this.emailRepository.save(update_page)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        common_1.Logger.error(error_3);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EmailTemplateService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(email_template_entity_1.moleculus_email_template))
    ], EmailTemplateService);
    return EmailTemplateService;
}());
exports.EmailTemplateService = EmailTemplateService;
