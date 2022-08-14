import { CreatePageDto } from "src/modules/dto/CreatePage.dto";

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { PageService } from "./pages.service";
import { UpdatePageDto } from "../dtos/Update-page.dto";

@Controller("admin/pages")
export class PagesController {
  constructor(
    @Inject("PAGE_SERVICE") private readonly pageService: PageService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async create(@Res() res: Response, @Body() createPageDto: CreatePageDto) {
    const result = await this.pageService.create(createPageDto);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in Creating Page",
        data: null,
      });
    }
    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Page Created Successfully",
      data: {},
    });
  }

  @Put("update/:id")
  async update(
    @Param("id") pagetitle_id: string,
    @Res() res: Response,
    @Body() updatePageDto: UpdatePageDto
  ) {
    const result = await this.pageService.update(updatePageDto, pagetitle_id);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Page Updated Successfully",
      data: {},
    });
  }
}
