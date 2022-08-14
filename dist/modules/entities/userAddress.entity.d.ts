import { BaseEntity } from "typeorm";
export declare class moleculus_user_address extends BaseEntity {
    address_id: number;
    user_address_id: number;
    address_line1: string;
    address_line2: string;
    other_info: string;
    created_datetime: Date;
    created_ip: string;
}
