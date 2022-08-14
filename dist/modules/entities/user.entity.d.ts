export declare enum is_email_verified_Enum {
    Yes = "Yes",
    No = "No"
}
export declare enum document_Type_Enum {
    SSN = "SSN",
    TIN = "TIN",
    AADHAR = "AADHAR",
    PAN = "PAN"
}
export declare enum is_phone_verified_Enum {
    Yes = "Yes",
    No = "No"
}
export declare enum status_Enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare enum is_deleted_Enum {
    Yes = "Yes",
    No = "No"
}
export declare enum dark_mode_Enum {
    On = "On",
    Off = "Off"
}
export declare enum biometric_Enum {
    On = "On",
    Off = "Off"
}
export declare enum google_auth_enabled_Enum {
    Enable = "Enable",
    Disable = "Disable"
}
export declare enum user_login_type_Enum {
    Normal = "Normal",
    Apple = "Apple",
    Google = "Google",
    Facebook = "Facebook",
    Twitter = "Twitter"
}
export declare class moleculus_user {
    user_id: number;
    legalname: string;
    first_name: string;
    last_name: string;
    email_id: string;
    temp_email_id: string;
    password: string;
    country_name: string;
    country_id: number;
    state_name: string;
    phone_code: string;
    email_token: string;
    phone_number: string;
    otp: string;
    otp_creation_time: number;
    is_email_verify: is_email_verified_Enum;
    is_phone_verify: is_phone_verified_Enum;
    document_type: document_Type_Enum;
    document_value: string;
    dob: string;
    tin: string;
    ssn: string;
    citizenship: string;
    city: string;
    zipcode: string;
    wallet_balance: number;
    status: status_Enum;
    is_deleted: is_deleted_Enum;
    default_currency: string;
    isSignupFilled: number;
    isPersonalFilled: number;
    isAddressFilled: number;
    dark_mode: dark_mode_Enum;
    biometric: biometric_Enum;
    passcode: string;
    created_datetime: Date;
    created_ip: string;
    modified_datetime: Date;
    modified_ip: string;
    google_auth_code: string;
    google_auth_enabled: google_auth_enabled_Enum;
    user_login_type: user_login_type_Enum;
    secondary_email: string;
    temp_secret: any;
    auth_o_response: any;
    auth_o_response_decrypted: any;
}
