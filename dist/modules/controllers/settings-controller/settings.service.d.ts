import { Repository } from "typeorm";
import { CreateSettingDto } from "../../dto/CreateSettting.dto";
import { moleculus_settings as SettingRepository } from "../../entities/settings.entity";
export declare class SettingsService {
    private readonly settingRepository;
    constructor(settingRepository: Repository<SettingRepository>);
    createSetting(createSettingDto: CreateSettingDto): Promise<SettingRepository>;
    editSetting(id: number, createSettingDto: CreateSettingDto): Promise<SettingRepository>;
    getAllSettings(): Promise<SettingRepository[]>;
    getSetting(id: number): Promise<SettingRepository>;
    getSettingKeyword(settingKeyWord: string): Promise<SettingRepository>;
    deleteSetting(settingKeyWord: string): Promise<SettingRepository>;
}
