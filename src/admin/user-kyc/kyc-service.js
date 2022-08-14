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
exports.KYCService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var userKYC_entity_1 = require("../../modules/entities/userKYC.entity");
var user_entity_1 = require("../../modules/entities/user.entity");
var axios_1 = require("axios");
require("dotenv").config({ debug: false });
var KYCService = /** @class */ (function () {
    function KYCService(kycEntity, userEntity) {
        this.kycEntity = kycEntity;
        this.userEntity = userEntity;
    }
    KYCService.prototype.changekycstatus = function (user_id, required_status) {
        return __awaiter(this, void 0, void 0, function () {
            var user_detail, user_country_id, user_id_, user, req_data, new_kyc, req_data, req_data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        common_1.Logger.log("changekycstatus", "KYCService");
                        return [4 /*yield*/, this.userEntity.findOne({
                                where: { user_id: parseInt(user_id) }
                            })];
                    case 1:
                        user_detail = _a.sent();
                        user_country_id = user_detail.country_id;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 23, , 24]);
                        user_id_ = parseInt(user_id);
                        return [4 /*yield*/, this.kycEntity.findOne({
                                where: { kyc_user_id: user_id_ },
                                order: { kyc_id: "DESC" }
                            })];
                    case 3:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 22];
                        if (!(required_status === "Pending")) return [3 /*break*/, 12];
                        user.kyc_status = userKYC_entity_1.kyc_status_enum.Pending;
                        if (!(user_detail.country_name == "USA" ||
                            user_detail.country_name == "usa" ||
                            user_detail.country_name == "Usa")) return [3 /*break*/, 8];
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                req_data: "";
                            })];
                    case 4:
                        req_data = _a.sent();
                        return [4 /*yield*/, this.kycEntity.create({
                                kyc_user_id: user_id_,
                                kyc_status: userKYC_entity_1.kyc_status_enum.Pending,
                                created_datetime: new Date(),
                                created_ip: req_data.ip ? req_data.ip : ""
                            })];
                    case 5:
                        new_kyc = _a.sent();
                        return [4 /*yield*/, this.kycEntity.save(new_kyc)];
                    case 6:
                        _a.sent();
                        user.api_repsonse = "KYC changed to ".concat(required_status, " by Admin @ ").concat(new Date().toLocaleString(), " by IP: ").concat(req_data.ip ? req_data.ip : "NA");
                        return [4 /*yield*/, this.kycEntity.save(user)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 8: return [4 /*yield*/, axios_1["default"]
                            .get("https://ipinfo.io")
                            .then(function (res) { return res.data; })["catch"](function (err) {
                            req_data: "";
                        })];
                    case 9:
                        req_data = _a.sent();
                        user.api_repsonse = "KYC changed to ".concat(required_status, " by Admin @ ").concat(new Date().toLocaleString(), " by IP: ").concat(req_data.ip ? req_data.ip : "NA");
                        return [4 /*yield*/, this.kycEntity.save(user)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [2 /*return*/, user];
                    case 12:
                        if (!(required_status === "Completed")) return [3 /*break*/, 15];
                        if (user_country_id === 1) {
                            user.token = "".concat(Math.floor(Math.random() * 1000000000000).toString(), "-").concat(Math.floor(Math.random() * 1000000000000).toString(), " ");
                        }
                        user.kyc_status = userKYC_entity_1.kyc_status_enum.Completed;
                        return [4 /*yield*/, axios_1["default"]
                                .get("https://ipinfo.io")
                                .then(function (res) { return res.data; })["catch"](function (err) {
                                req_data: "";
                            })];
                    case 13:
                        req_data = _a.sent();
                        user.api_repsonse = "KYC changed to ".concat(required_status, " by Admin @ ").concat(new Date().toLocaleString(), " by IP: ").concat(req_data.ip ? req_data.ip : "NA");
                        return [4 /*yield*/, this.kycEntity.save(user)];
                    case 14:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 15:
                        if (!(required_status === "Rejected")) return [3 /*break*/, 21];
                        if (!(user_country_id === 1)) return [3 /*break*/, 17];
                        user.api_repsonse = "Rejected_By_Admin";
                        user.token = null;
                        user.vendor_id = null;
                        return [4 /*yield*/, this.kycEntity.save(user)];
                    case 16:
                        _a.sent();
                        _a.label = 17;
                    case 17:
                        if (!(user_country_id == 2)) return [3 /*break*/, 19];
                        user_detail.isPersonalFilled = 0;
                        user_detail.isAddressFilled = 0;
                        user_detail.phone_number = user_detail.document_value = null;
                        user_detail.document_type = user_entity_1.document_Type_Enum.PAN;
                        return [4 /*yield*/, this.userEntity.save(user_detail)];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        user.kyc_status = userKYC_entity_1.kyc_status_enum.Rejected;
                        return [4 /*yield*/, this.kycEntity.save(user)];
                    case 20:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 21: return [2 /*return*/, null];
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        error_1 = _a.sent();
                        common_1.Logger.error(error_1);
                        return [2 /*return*/, null];
                    case 24: return [2 /*return*/];
                }
            });
        });
    };
    KYCService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(userKYC_entity_1.moleculus_user_kyc)),
        __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.moleculus_user))
    ], KYCService);
    return KYCService;
}());
exports.KYCService = KYCService;
