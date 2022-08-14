/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSettingDto } from "../../dto/CreateSettting.dto";
import { moleculus_settings as SettingRepository } from "../../entities/settings.entity";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingRepository)
    private readonly settingRepository: Repository<SettingRepository>
  ) {}

  async createSetting(createSettingDto: CreateSettingDto) {
    Logger.log('Inside Setting Service Layer: "createSetting" ...');
    try {
      const setting = await this.settingRepository.create(createSettingDto);
      setting.created_datetime = new Date();
      setting.setting_keyword = createSettingDto.setting_keyword;
      return await this.settingRepository.save(setting);
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  async editSetting(id: number, createSettingDto: CreateSettingDto) {
    console.log('Inside Setting Service Layer: "editSetting" ...');
    const setting = await this.settingRepository.findOne({
      where: { setting_id: id },
    });

    if (setting) {
      const setting_ = this.settingRepository.merge(setting, createSettingDto);
      return await this.settingRepository.save(setting_);
    } else {
      return null;
    }
  }

  async getAllSettings() {
    Logger.log("Get All settings");
    const settings = await this.settingRepository.find({});
    return settings;
  }

  //get setting
  async getSetting(id: number) {
    console.log('Inside Setting Service Layer: "getSetting" ...');
    return await this.settingRepository.findOne({
      where: { setting_id: id },
    });
  }

  async getSettingKeyword(settingKeyWord: string) {
    const setting = await this.settingRepository.findOne({
      where: { setting_keyword: settingKeyWord },
    });
    if (setting) {
      return setting;
    } else {
      return null;
    }
  }

  //delete setting:
  async deleteSetting(settingKeyWord: string) {
    console.log('Inside Setting Service Layer: "deleteSetting" ...');
    const setting = await this.getSettingKeyword(settingKeyWord);
    if (setting) {
      setting.is_deleted = true;
      return await this.settingRepository.save(setting);
    } else {
      return null;
    }
  }
}
