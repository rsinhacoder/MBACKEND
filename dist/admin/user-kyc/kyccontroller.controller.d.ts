import { Response } from "express";
import { KYCService } from "./kyc-service";
export declare class KyccontrollerController {
    private readonly kycService;
    constructor(kycService: KYCService);
    changekycstatus(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
}
