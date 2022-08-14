import { BaseEntity } from "typeorm";
export declare enum Login_log_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_countries extends BaseEntity {
    pk_country_id: number;
    country_id: number;
    country_flag: string;
    country_sortname: string;
    country_phone_code: string;
    country_name: string;
}
