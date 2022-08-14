import { BaseEntity } from "typeorm";
export declare enum page_status_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_pages extends BaseEntity {
    pagetitle_id: number;
    pagetitle: string;
    pageKeyWord: string;
    description: string;
    page_status: page_status_enum;
    created_datetime: Date;
    created_ip: string;
    page_country_id: number;
    page_state_id: string;
    is_deleted: boolean;
}
