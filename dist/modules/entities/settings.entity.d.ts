import { BaseEntity } from "typeorm";
export declare enum setting_status_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_settings extends BaseEntity {
    setting_id: number;
    setting_name: string;
    setting_value: string;
    setting_status: setting_status_enum;
    created_datetime: Date;
    setting_keyword: string;
    created_ip: string;
    is_deleted: boolean;
}
