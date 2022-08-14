import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Request,
  Res,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request as RequestEx, Response } from "express";
import {
  moleculus_user_notification as NotificationEntity,
  price_alert_device_enum,
  price_alert_email_enum,
  security_device_enum,
  security_email_enum,
} from "src/modules/entities/userNotification.entity";
import {
  balance_device_enum,
  balance_email_enum,
} from "src/modules/entities/userNotification.entity";
import { getManager, Repository } from "typeorm";
import { UserNotificationsService } from "./user-notifications.service";
@Controller("usernotifications")
export class UserNotificationsController {
  constructor(
    @Inject("NOTIFICATIONS_SERVICE")
    private readonly userNotificationsService: UserNotificationsService,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>
  ) {}

  @Post("/updatepreference")
  async updateNotificationStatus(
    @Request() req: RequestEx,
    @Res() res: Response,
    @Body() body: any
  ) {
    const { user_id, type } = body;

    const result = await this.userNotificationsService.updateNotificationStatus(
      parseInt(user_id),
      type
    );
    if (result === "Invalid type") {
      return res.status(400).json({
        code: "400",
        status: "error",
        data: null,
        message: "Invalid type",
      });
    }
    if (result === "No notification found") {
      return res.status(404).json({
        code: "400",
        status: "error",
        message: "No notification found for the given user",
        data: null,
      });
    }
    if (result) {
      console.log(result);
      if (
        result.balance_email === balance_email_enum.Off &&
        result.balance_device === balance_device_enum.Off
      ) {
        result.balance_device = balance_device_enum.On;
        await this.notificationRepository.save(result);
      }
      if (
        result.price_alert_device === price_alert_device_enum.Off &&
        result.price_alert_email === price_alert_email_enum.Off
      ) {
        result.price_alert_device = price_alert_device_enum.On;
        await this.notificationRepository.save(result);
      }
      if (
        result.security_device === security_device_enum.Off &&
        result.security_email === security_email_enum.Off
      ) {
        result.security_device = security_device_enum.On;
        await this.notificationRepository.save(result);
      }

      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Notification status updated successfully",
        data: null,
      });
    } else if (!result || result == undefined || result == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Notification status not updated",
        data: null,
      });
    }
  }
}
