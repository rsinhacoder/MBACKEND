export declare class MailService {
    constructor();
    sendMailAWS(subject: string, message: string, to: string, from: string): Promise<boolean>;
    sesTest(to: string, from: string, subject: string, message: string): Promise<void>;
    sendMail(subject: string, message: string, to: string): Promise<boolean>;
}
