export declare class PaytmChecksum {
    static iv: string;
    static encrypt(input: any, key: any): any;
    static decrypt(encrypted: any, key: any): any;
    static generateSignature(params: any, key: any): Promise<any>;
    static verifySignature(params: any, key: any, checksum: any): boolean | Promise<never>;
    static generateSignatureByString(params: any, key: any): Promise<any>;
    static verifySignatureByString(params: any, key: any, checksum: any): boolean;
    static generateRandomString(length: any): Promise<unknown>;
    static getStringByParams(params: any): string;
    static calculateHash(params: any, salt: any): any;
    static calculateChecksum(params: any, key: any, salt: any): any;
}
