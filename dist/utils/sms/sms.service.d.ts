export declare class SMSService {
    constructor();
    sendSMSAWS(message: string, to: string): Promise<boolean>;
}
