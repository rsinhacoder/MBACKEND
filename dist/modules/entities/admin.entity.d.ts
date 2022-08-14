import { BaseEntity } from "typeorm";
export declare enum google_auth_enabled_Enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_admin extends BaseEntity {
    admin_id: number;
    google_auth_code: string;
    google_auth_enabled: google_auth_enabled_Enum;
    temp_secret: any;
    first_name: string;
    last_name: string;
    email_id: string;
    password: string;
    username: string;
    created_datetime: Date;
    created_ip: string;
    admin_profile: string;
    admin_slug: string;
    super_admin_role: boolean;
    is_deleted: boolean;
}
