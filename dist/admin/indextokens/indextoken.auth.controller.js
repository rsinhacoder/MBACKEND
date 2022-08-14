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
exports.AdminIndexController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_tokens_entity_1 = require("../../modules/entities/index_tokens.entity");
let AdminIndexController = class AdminIndexController {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async getTokenCount(res) {
        const tokenCount = await this.tokenRepository.count();
        if (!tokenCount || tokenCount === null || tokenCount === undefined) {
            return res.status(400).json({
                message: "No tokens found",
                code: "400",
                status: "error",
                data: [],
            });
        }
        else
            return res.status(200).json({
                message: "Tokens found",
                code: "200",
                status: "success",
                data: tokenCount,
            });
    }
    async getTokenList(res) {
        const result = await this.tokenRepository.find({
            order: {
                index_id: "ASC",
            },
        });
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                message: "No tokens found",
                code: "400",
                status: "error",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                message: "Tokens found",
                code: "200",
                status: "success",
                data: result,
            });
        }
    }
    async addIndexToken(res, body) {
        const { token_code, index_name, index_price, index_description } = body;
        var index_profit = Math.floor(Math.random() * (100 - 1) + 1);
        var index_profit2 = index_profit.toString();
        const manager = (0, typeorm_2.getManager)();
        const insertQuery = `INSERT INTO moleculus_index_tokens (token_code, index_name, index_price, index_description) VALUES ('${token_code}', '${index_name}', '${index_price}', '${index_description}')`;
        const insertResult = await manager.query(insertQuery);
        if (!insertResult || insertResult === null || insertResult === undefined) {
            return res.status(400).json({
                message: "No tokens Added",
                code: "400",
                status: "error",
                data: [],
            });
        }
        return res.status(200).json({
            message: "Token added Successfully",
            code: "200",
            status: "success",
            data: [],
        });
    }
    async editTokenDetails(res, body) {
        const { description, index_id, index_name, index_price } = body;
        const manager = (0, typeorm_2.getManager)();
        const updateQuery = `UPDATE moleculus_index_tokens SET index_description='${description}' ,index_name='${index_name}', index_price='${index_price}'  WHERE index_id=${index_id}`;
        const updateResult = await manager.query(updateQuery);
        if (!updateResult[1] ||
            updateResult[1] === 0 ||
            updateResult === undefined) {
            return res.status(400).json({
                message: "No tokens found",
                code: "400",
                status: "error",
                data: [],
            });
        }
        return res.status(200).json({
            message: "Tokens description updated",
            code: "200",
            status: "success",
            data: updateResult[1],
        });
    }
    async getTokenDetails(res, id) {
        var index_id = parseInt(id);
        const result = await this.tokenRepository.findOne({
            where: {
                index_id: index_id,
            },
        });
        if (!result || result === null || result === undefined) {
            return res.status(400).json({
                message: "No tokens found",
                code: "400",
                status: "error",
                data: null,
            });
        }
        else {
            return res.status(200).json({
                message: "Tokens found",
                code: "200",
                status: "success",
                data: result,
            });
        }
    }
};
__decorate([
    (0, common_1.Get)("/gettokenCount"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminIndexController.prototype, "getTokenCount", null);
__decorate([
    (0, common_1.Put)("/gettokenlist"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminIndexController.prototype, "getTokenList", null);
__decorate([
    (0, common_1.Post)("/addindextoken"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminIndexController.prototype, "addIndexToken", null);
__decorate([
    (0, common_1.Post)("/edittokendetails"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminIndexController.prototype, "editTokenDetails", null);
__decorate([
    (0, common_1.Get)("/gettokendetails/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminIndexController.prototype, "getTokenDetails", null);
AdminIndexController = __decorate([
    (0, common_1.Controller)("admin/index"),
    __param(0, (0, typeorm_1.InjectRepository)(index_tokens_entity_1.moleculus_index_tokens)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminIndexController);
exports.AdminIndexController = AdminIndexController;
//# sourceMappingURL=indextoken.auth.controller.js.map