import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { Repository } from "typeorm";
import { moleculus_pages as PagesEntity } from "../../modules/entities/pages.entity";
import { UpdatePageDto } from "../dtos/Update-page.dto";
require("dotenv").config({ debug: false });

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PagesEntity)
    private readonly pagesRepository: Repository<PagesEntity>
  ) {}

  async create(createPageDto: CreatePageDto) {
    try {
      const new_page = this.pagesRepository.create(createPageDto);
      new_page.created_datetime = new Date();
      const req_data = await axios
        .get("https://ipinfo.io")
        .then((res) => res.data);
      new_page.created_ip = req_data.ip;
      new_page.description = createPageDto.description;
      new_page.pagetitle = createPageDto.pagetitle;
      await this.pagesRepository.save(new_page);
      Logger.log(`Page Created Successfully`, "PageService");
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
  async update(updatePageDto: UpdatePageDto, pagetitle_id: string) {
    try {
      const pagetitle_id_ = parseInt(pagetitle_id);
      const page = await this.pagesRepository.findOne({
        where: { pagetitle_id: pagetitle_id_ },
      });
      if (page) {
        page.pagetitle = updatePageDto.pagetitle;
        page.description = updatePageDto.description;
        await this.pagesRepository.save(page);
        Logger.log(`Page Updated Successfully`, "PageService");
        return true;
      }
    } catch (error) {
      Logger.error(error);
      return false;
    }
  }
}
