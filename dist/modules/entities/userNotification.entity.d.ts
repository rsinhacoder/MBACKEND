import { BaseEntity } from "typeorm";
export declare enum balance_email_enum {
    On = "On",
    Off = "Off"
}
export declare enum balance_device_enum {
    On = "On",
    Off = "Off"
}
export declare enum security_email_enum {
    On = "On",
    Off = "Off"
}
export declare enum security_device_enum {
    On = "On",
    Off = "Off"
}
export declare enum price_alert_device_enum {
    On = "On",
    Off = "Off"
}
export declare enum price_alert_email_enum {
    On = "On",
    Off = "Off"
}
export declare enum update_email_enum {
    On = "On",
    Off = "Off"
}
export declare enum update_device_enum {
    On = "On",
    Off = "Off"
}
export declare class moleculus_user_notification extends BaseEntity {
    noti_id: number;
    noti_user_id: number;
    balance_email: balance_email_enum;
    balance_device: balance_device_enum;
    security_email: security_email_enum;
    security_device: security_device_enum;
    price_alert_device: price_alert_device_enum;
    price_alert_email: price_alert_email_enum;
    update_email: update_email_enum;
    update_device: update_device_enum;
    modified_datetime: Date;
    modified_ip: string;
}
