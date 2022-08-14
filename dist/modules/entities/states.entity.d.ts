import { BaseEntity } from "typeorm";
export declare enum Login_log_enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare class moleculus_states extends BaseEntity {
    pk_state_id: number;
    state_name: string;
    state_abbreviation: string;
    state_country_id: number;
}
