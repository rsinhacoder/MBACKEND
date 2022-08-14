import { BaseEntity } from "typeorm";
export declare enum kyc_status_enum {
    Pending = "Pending",
    Rejected = "Rejected",
    Completed = "Completed"
}
export declare class moleculus_user_kyc extends BaseEntity {
    kyc_id: number;
    acknowledgement_number: string;
    vendor_id: string;
    previous_status: string;
    kyc_user_id: number;
    token: string;
    api_repsonse: string;
    kyc_status: kyc_status_enum;
    created_datetime: Date;
    created_ip: string;
}
