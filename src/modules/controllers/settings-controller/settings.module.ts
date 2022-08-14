import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { moleculus_settings } from "../../entities/settings.entity";
import { SettingsControllerController as SettingsController } from "./settings-controller.controller";
import { SettingsService } from "./settings.service";

@Module({
  imports: [TypeOrmModule.forFeature([moleculus_settings])],
  controllers: [SettingsController],
  providers: [
    {
      provide: "SETTINGS_SERVICE",
      useClass: SettingsService,
    },
  ],
})
export class SettingsModule {}
