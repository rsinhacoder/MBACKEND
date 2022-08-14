import { BaseEntity } from "typeorm";
export declare enum page_email_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_email_template extends BaseEntity {
    email_template_id: number;
    email_title: string;
    email_keyword: string;
    email_variable: string;
    description: string;
    subject: string;
    email_template_status: page_email_enum;
    created_datetime: Date;
    created_ip: string;
    email_country_id: number;
    email_state_id: string;
    is_deleted: boolean;
}
