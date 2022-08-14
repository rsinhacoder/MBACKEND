import { Response } from "express";
import { Repository } from "typeorm";
import { moleculus_index_tokens as TokenEntity } from "../../modules/entities/index_tokens.entity";
export declare class AdminIndexController {
    private readonly tokenRepository;
    constructor(tokenRepository: Repository<TokenEntity>);
    getTokenCount(res: Response): Promise<Response<any, Record<string, any>>>;
    getTokenList(res: Response): Promise<Response<any, Record<string, any>>>;
    addIndexToken(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    editTokenDetails(res: Response, body: any): Promise<Response<any, Record<string, any>>>;
    getTokenDetails(res: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
