import { BaseEntity } from "typeorm";
export declare enum tra_status_enum {
    Pending = "Pending",
    Completed = "Completed",
    Failed = "Failed"
}
export declare class moleculus_sip_transactions extends BaseEntity {
    sip_tra_id: number;
    sip_id: number;
    tra_user_id: number;
    token_code: string;
    trasaction_price: string;
    trasaction_currency: string;
    token_name: string;
    tra_status: tra_status_enum;
    created_datetime: Date;
}
