import { BaseEntity } from "typeorm";
export declare enum page_status_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_index_tokens extends BaseEntity {
    index_id: number;
    token_code: string;
    index_name: string;
    index_price: string;
    index_description: string;
    index_profit: string;
    index_profit_percent: string;
    index_total_value: string;
}
