import { BaseEntity } from "typeorm";
export declare enum Login_log_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_login_log extends BaseEntity {
    login_log_id: number;
    logged_user_country_of_login: string;
    logged_user_email: string;
    logged_user_id: string;
    logged_user_name: string;
    logged_user_ip: string;
    setting_status: Login_log_enum;
    log_in_datetime: Date;
    log_out_datetime: Date;
    is_login_log_deleted: boolean;
}
