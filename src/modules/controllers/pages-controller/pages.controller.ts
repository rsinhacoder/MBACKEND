import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { PagesService } from "./pages.service";

@Controller("users/pages")
export class PagesController {
  constructor(
    @Inject("PAGES_SERVICE")
    private readonly pagesService: PagesService
  ) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async createPage(@Body() createPageDto: CreatePageDto, @Res() res: Response) {
    const new_page = await this.pagesService.createPage(createPageDto);
    if (new_page === true) {
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Page created successfully",
        data: new_page,
      });
    } else {
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Page not created",
        data: null,
      });
    }
  }
  @Get("getpage/:pageKeyWord")
  async getPageContentByKeyword(
    @Res() res: Response,
    @Param("pageKeyWord") pageKeyWord: string
  ) {
    const page = await this.pagesService.getPageContentByKeyword(pageKeyWord);
    if (page) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Page found successfully! ",
        data: page,
      });
    } else {
      return res.status(500).json({
        code: "500",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    }
  }

  @Get("getpage/id/:id")
  async getPageContentById(@Res() res: Response, @Param("id") id: string) {
    const page = await this.pagesService.getpageContentById(parseInt(id));
    if (page) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Page found successfully! ",
        data: page,
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    }
  }

  @Delete("delete/:id")
  async deletePage(@Res() res: Response, @Param("id") id: string) {
    const delete_result = await this.pagesService.getpageContentById(
      parseInt(id)
    );
    if (delete_result) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Page Deleted successfully! ",
        data: null,
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    }
  }
}
