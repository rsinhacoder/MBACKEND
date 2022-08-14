import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { CreateSettingDto } from "src/modules/dto/CreateSettting.dto";
import { moleculus_settings as SettingsRepository } from "../../entities/settings.entity";
import { SettingsService } from "./settings.service";

@Controller("settings")
export class SettingsControllerController {
  constructor(
    @InjectRepository(SettingsRepository)
    private readonly settingsRepository: SettingsRepository,
    @Inject("SETTINGS_SERVICE")
    private readonly settingsService: SettingsService
  ) {}

  @Get("allsettings")
  async getAllSettings(
    @Res() res: Response,
    @Param("settingKeyWord") settingKeyWord: string
  ) {
    console.log("Inside Settings Controller");
    const settings = await this.settingsService.getAllSettings();
    if (settings) {
      return res.status(200).json({
        message: "All settings retrieved successfully.",
        settings: settings,
      });
    } else {
      res.status(400).json({
        message: "No settings found",
        settings: settings,
      });
    }
  }

  @Get("getsetting/:settingKeyWord")
  async getSetting(
    @Res() res: Response,
    @Param("settingKeyWord") settingKeyWord: string
  ) {
    Logger.log("Inside Settings Controller");
    const settings = await this.settingsService.getSettingKeyword(
      settingKeyWord
    );
    if (settings) {
      return res.status(200).json({
        message: `All settings of for thr Keyword: "${settingKeyWord}" retrieved successfully...`,
        settings: settings,
      });
    } else {
      res.status(400).json({
        message: "No settings found",
        settings: settings,
      });
    }
  }

  @Post("create")
  @UsePipes(ValidationPipe)
  async createState(
    @Body() createSettingDto: CreateSettingDto,
    @Res() res: Response
  ) {
    const new_setting = await this.settingsService.createSetting(
      createSettingDto
    );
    if (!new_setting || new_setting === null || new_setting === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Some Error Occured",
        data: {},
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Setting Created Successfully",
        data: {
          setting_id: new_setting.setting_id,
          setting_keyword: new_setting.setting_keyword,
        },
      });
    }
  }

  @Delete("delete/:settingKeyWord")
  async deleteSetting(
    @Param("settingKeyWord") settingKeyWord: string,
    @Res() res: Response
  ) {
    const setting = await this.settingsService.getSettingKeyword;
    if (setting) {
      var setting_ = await this.settingsService.deleteSetting(settingKeyWord);
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Setting Deleted Successfully",
        data: {},
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Some Error Occured",
        data: {},
      });
    }
  }
}
