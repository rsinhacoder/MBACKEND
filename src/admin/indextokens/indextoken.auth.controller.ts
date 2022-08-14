import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";

import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { moleculus_index_tokens as TokenEntity } from "../../modules/entities/index_tokens.entity";

@Controller("admin/index")
export class AdminIndexController {
  constructor(
    // @Inject("INDEX_SERVICE")
    // private readonly adminAuthService: AdminAuthService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>
  ) {}

  @Get("/gettokenCount")
  async getTokenCount(@Res() res: Response) {
    const tokenCount = await this.tokenRepository.count();
    if (!tokenCount || tokenCount === null || tokenCount === undefined) {
      return res.status(400).json({
        message: "No tokens found",
        code: "400",
        status: "error",
        data: [],
      });
    } else
      return res.status(200).json({
        message: "Tokens found",
        code: "200",
        status: "success",
        data: tokenCount,
      });
  }

  @Put("/gettokenlist")
  async getTokenList(@Res() res: Response) {
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
    } else {
      return res.status(200).json({
        message: "Tokens found",
        code: "200",
        status: "success",
        data: result,
      });
    }
  }

  @Post("/addindextoken")
  async addIndexToken(@Res() res: Response, @Body() body: any) {
    const { token_code, index_name, index_price, index_description } = body;
    var index_profit = Math.floor(Math.random() * (100 - 1) + 1);
    var index_profit2 = index_profit.toString();
    const manager = getManager();
    //insert query:

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

    return res.status(200).json({
      message: "Token added Successfully",
      code: "200",
      status: "success",
      data: [],
    });
  }

  @Post("/edittokendetails")
  async editTokenDetails(@Res() res: Response, @Body() body: any) {
    const { description, index_id, index_name, index_price } = body;
    const manager = getManager();
    //update query:
    const updateQuery = `UPDATE moleculus_index_tokens SET index_description='${description}' ,index_name='${index_name}', index_price='${index_price}'  WHERE index_id=${index_id}`;
    const updateResult = await manager.query(updateQuery);

    if (
      !updateResult[1] ||
      updateResult[1] === 0 ||
      updateResult === undefined
    ) {
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

  @Get("/gettokendetails/:id")
  async getTokenDetails(@Res() res: Response, @Param("id") id: string) {
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
    } else {
      return res.status(200).json({
        message: "Tokens found",
        code: "200",
        status: "success",
        data: result,
      });
    }
  }
}
