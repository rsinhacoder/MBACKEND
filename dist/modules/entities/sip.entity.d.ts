import { BaseEntity } from "typeorm";
export declare enum sip_status_enum {
    Active = "Active",
    Pause = "Pause",
    Cancel = "Cancel"
}
export declare enum sip_day_enum {
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    Bimonthly = "Bimonthly"
}
export declare class moleculus_sip extends BaseEntity {
    user_sip_id: number;
    sip_user_id: number;
    token_name: string;
    token_price: string;
    token_code: string;
    token_current_price: string;
    sip_day: sip_day_enum;
    sip_status: sip_status_enum;
    sip_comment: string;
    sip_start_date: Date;
    sip_end_date: Date;
    sip_next_date: Date;
    sip_bank_id: number;
    created_datetime: Date;
    created_ip: string;
}
