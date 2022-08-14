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
exports.AdminIndexController = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var index_tokens_entity_1 = require("../../modules/entities/index_tokens.entity");
var AdminIndexController = /** @class */ (function () {
    function AdminIndexController(
    // @Inject("INDEX_SERVICE")
    // private readonly adminAuthService: AdminAuthService,
    tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    AdminIndexController.prototype.getTokenCount = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenRepository.count()];
                    case 1:
                        tokenCount = _a.sent();
                        if (!tokenCount || tokenCount === null || tokenCount === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No tokens found",
                                    code: "400",
                                    status: "error",
                                    data: []
                                })];
                        }
                        else
                            return [2 /*return*/, res.status(200).json({
                                    message: "Tokens found",
                                    code: "200",
                                    status: "success",
                                    data: tokenCount
                                })];
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminIndexController.prototype.getTokenList = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenRepository.find({
                            order: {
                                index_id: "ASC"
                            }
                        })];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No tokens found",
                                    code: "400",
                                    status: "error",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    message: "Tokens found",
                                    code: "200",
                                    status: "success",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminIndexController.prototype.addIndexToken = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var token_code, index_name, index_price, index_description, index_profit, index_profit2, manager, insertQuery, insertResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token_code = body.token_code, index_name = body.index_name, index_price = body.index_price, index_description = body.index_description;
                        index_profit = Math.floor(Math.random() * (100 - 1) + 1);
                        index_profit2 = index_profit.toString();
                        manager = (0, typeorm_2.getManager)();
                        insertQuery = "INSERT INTO moleculus_index_tokens (token_code, index_name, index_price, index_description) VALUES ('".concat(token_code, "', '").concat(index_name, "', '").concat(index_price, "', '").concat(index_description, "')");
                        return [4 /*yield*/, manager.query(insertQuery)];
                    case 1:
                        insertResult = _a.sent();
                        if (!insertResult || insertResult === null || insertResult === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No tokens Added",
                                    code: "400",
                                    status: "error",
                                    data: []
                                })];
                        }
                        // const insertRes = await this.tokenRepository.create({
                        //   token_code,
                        //   index_name,
                        //   index_price,
                        //   index_description,
                        // });
                        // const result_ = await this.tokenRepository.save(insertRes);
                        // if (!result_ || result_ === null || result_ === undefined) {
                        //   return res.status(400).json({
                        //     message: "No tokens found",
                        //     code: "400",
                        //     status: "error",
                        //     data: [],
                        //   });
                        // } else {
                        //   return res.status(200).json({
                        //     message: "Tokens added",
                        //     code: "200",
                        //     status: "success",
                        //     data: result_,
                        //   });
                        // }
                        return [2 /*return*/, res.status(200).json({
                                message: "Token added Successfully",
                                code: "200",
                                status: "success",
                                data: []
                            })];
                }
            });
        });
    };
    AdminIndexController.prototype.editTokenDetails = function (res, body) {
        return __awaiter(this, void 0, void 0, function () {
            var description, index_id, index_name, index_price, manager, updateQuery, updateResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = body.description, index_id = body.index_id, index_name = body.index_name, index_price = body.index_price;
                        manager = (0, typeorm_2.getManager)();
                        updateQuery = "UPDATE moleculus_index_tokens SET index_description='".concat(description, "' ,index_name='").concat(index_name, "', index_price='").concat(index_price, "'  WHERE index_id=").concat(index_id);
                        return [4 /*yield*/, manager.query(updateQuery)];
                    case 1:
                        updateResult = _a.sent();
                        if (!updateResult[1] ||
                            updateResult[1] === 0 ||
                            updateResult === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No tokens found",
                                    code: "400",
                                    status: "error",
                                    data: []
                                })];
                        }
                        return [2 /*return*/, res.status(200).json({
                                message: "Tokens description updated",
                                code: "200",
                                status: "success",
                                data: updateResult[1]
                            })];
                }
            });
        });
    };
    AdminIndexController.prototype.getTokenDetails = function (res, id) {
        return __awaiter(this, void 0, void 0, function () {
            var index_id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index_id = parseInt(id);
                        return [4 /*yield*/, this.tokenRepository.findOne({
                                where: {
                                    index_id: index_id
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result || result === null || result === undefined) {
                            return [2 /*return*/, res.status(400).json({
                                    message: "No tokens found",
                                    code: "400",
                                    status: "error",
                                    data: null
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(200).json({
                                    message: "Tokens found",
                                    code: "200",
                                    status: "success",
                                    data: result
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Get)("/gettokenCount"),
        __param(0, (0, common_1.Res)())
    ], AdminIndexController.prototype, "getTokenCount");
    __decorate([
        (0, common_1.Put)("/gettokenlist"),
        __param(0, (0, common_1.Res)())
    ], AdminIndexController.prototype, "getTokenList");
    __decorate([
        (0, common_1.Post)("/addindextoken"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], AdminIndexController.prototype, "addIndexToken");
    __decorate([
        (0, common_1.Post)("/edittokendetails"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Body)())
    ], AdminIndexController.prototype, "editTokenDetails");
    __decorate([
        (0, common_1.Get)("/gettokendetails/:id"),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Param)("id"))
    ], AdminIndexController.prototype, "getTokenDetails");
    AdminIndexController = __decorate([
        (0, common_1.Controller)("admin/index"),
        __param(0, (0, typeorm_1.InjectRepository)(index_tokens_entity_1.moleculus_index_tokens))
    ], AdminIndexController);
    return AdminIndexController;
}());
exports.AdminIndexController = AdminIndexController;
