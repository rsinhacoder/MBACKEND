import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { Repository } from "typeorm";
import { moleculus_pages as PagesEntity } from "../../modules/entities/pages.entity";
import { UpdatePageDto } from "../dtos/Update-page.dto";
export declare class PageService {
    private readonly pagesRepository;
    constructor(pagesRepository: Repository<PagesEntity>);
    create(createPageDto: CreatePageDto): Promise<boolean>;
    update(updatePageDto: UpdatePageDto, pagetitle_id: string): Promise<boolean>;
}
