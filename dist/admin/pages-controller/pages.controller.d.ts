import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { Response } from "express";
import { PageService } from "./pages.service";
import { UpdatePageDto } from "../dtos/Update-page.dto";
export declare class PagesController {
    private readonly pageService;
    constructor(pageService: PageService);
    create(res: Response, createPageDto: CreatePageDto): Promise<Response<any, Record<string, any>>>;
    update(pagetitle_id: string, res: Response, updatePageDto: UpdatePageDto): Promise<Response<any, Record<string, any>>>;
}
