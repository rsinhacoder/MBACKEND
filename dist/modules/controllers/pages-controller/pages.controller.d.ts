import { Response } from "express";
import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { PagesService } from "./pages.service";
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    createPage(createPageDto: CreatePageDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getPageContentByKeyword(res: Response, pageKeyWord: string): Promise<Response<any, Record<string, any>>>;
    getPageContentById(res: Response, id: string): Promise<Response<any, Record<string, any>>>;
    deletePage(res: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
