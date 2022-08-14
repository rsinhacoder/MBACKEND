import { Response } from "express";
import { CreateSettingDto } from "src/modules/dto/CreateSettting.dto";
import { moleculus_settings as SettingsRepository } from "../../entities/settings.entity";
import { SettingsService } from "./settings.service";
export declare class SettingsControllerController {
    private readonly settingsRepository;
    private readonly settingsService;
    constructor(settingsRepository: SettingsRepository, settingsService: SettingsService);
    getAllSettings(res: Response, settingKeyWord: string): Promise<Response<any, Record<string, any>>>;
    getSetting(res: Response, settingKeyWord: string): Promise<Response<any, Record<string, any>>>;
    createState(createSettingDto: CreateSettingDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSetting(settingKeyWord: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
