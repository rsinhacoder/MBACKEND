import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { moleculus_user_notification } from "../../entities/userNotification.entity";
import { UserNotificationsService } from "./user-notifications.service";
import { moleculus_user as UserEntity } from "../../entities/user.entity";
import { UserNotificationsController } from "./user-notifications.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([moleculus_user_notification, UserEntity]),
  ],
  controllers: [UserNotificationsController],
  providers: [
    {
      provide: "NOTIFICATIONS_SERVICE",
      useClass: UserNotificationsService,
    },
  ],
})
export class UserNotificationsModule {}
