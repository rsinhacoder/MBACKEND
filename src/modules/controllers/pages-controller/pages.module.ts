import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { moleculus_pages as pagesEntity } from "../../entities/pages.entity";
import { PagesService } from "./pages.service";
import { PagesController } from "./pages.controller";

@Module({
  imports: [TypeOrmModule.forFeature([pagesEntity])],
  controllers: [PagesController],
  providers: [{ provide: "PAGES_SERVICE", useClass: PagesService }],
})
export class PagesModule {}
