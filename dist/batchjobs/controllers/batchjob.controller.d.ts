import { Response } from "express";
import { BatchJobService } from "../services/batchjob.service";
export declare class BatchJobController {
    private readonly batchJobService;
    constructor(batchJobService: BatchJobService);
    getBatchJob(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    ptint(): Promise<void>;
    job1: any;
}
