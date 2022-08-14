import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePageDto } from "src/modules/dto/CreatePage.dto";
import { Repository } from "typeorm";
import axios from "axios";
import { moleculus_pages as PagesRepository } from "../../entities/pages.entity";

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PagesRepository)
    private readonly settingRepository: Repository<PagesRepository>
  ) {}

  async createPage(createPageDto: CreatePageDto) {
    try {
      const new_page = this.settingRepository.create(createPageDto);
      new_page.created_datetime = new Date();
      const req_data = await axios
        .get("https://ipinfo.io")
        .then((res) => res.data);
      new_page.created_ip = req_data.ip;
      new_page.description = createPageDto.description;
      await this.settingRepository.save(new_page);
      return true;
    } catch (e) {
      Logger.log(e);
      //console.log(e);
      return e.detail;
    }
  }
  async getPageContentByKeyword(pageKeyWord: string) {
    try {
      const page = await this.settingRepository.find({
        where: { pageKeyWord: pageKeyWord },
      });
      if (page) {
        return page;
      }
    } catch (e) {
      Logger.log(e);
      return null;
    }
  }
  async getpageContentById(id: number) {
    try {
      const page = await this.settingRepository.find({
        where: { pagetitle_id: id },
      });
      if (page) {
        return page;
      }
    } catch (err) {
      Logger.log(err);
      return null;
    }
  }

  async deletePageById(id: number) {
    try {
      const page = await this.settingRepository.findOne({
        where: { pagetitle_id: id },
      });
      if (page) {
        page.is_deleted = true;
        return true;
      }
    } catch (err) {
      Logger.log(err);
      return false;
    }
  }
}
