import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { Repository } from "typeorm";
import { moleculus_pages as PagesRepository } from "../../entities/pages.entity";
export declare class PagesService {
    private readonly settingRepository;
    constructor(settingRepository: Repository<PagesRepository>);
    createPage(createPageDto: CreatePageDto): Promise<any>;
    getPageContentByKeyword(pageKeyWord: string): Promise<PagesRepository[]>;
    getpageContentById(id: number): Promise<PagesRepository[]>;
    deletePageById(id: number): Promise<boolean>;
}
