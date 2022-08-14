import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository } from "typeorm";
import { moleculus_user as UserEntity } from "../../entities/user.entity";
import {
  balance_device_enum,
  balance_email_enum,
  moleculus_user_notification as NotificationsRepository,
  price_alert_device_enum,
  price_alert_email_enum,
  security_device_enum,
  security_email_enum,
  update_device_enum,
  update_email_enum,
} from "../../entities/userNotification.entity";
@Injectable()
export class UserNotificationsService {
  constructor(
    @InjectRepository(NotificationsRepository)
    @Inject("NOTIFICATIONS_SERVICE")
    private readonly notificationsRepository: Repository<NotificationsRepository>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getNotification(userId: number) {
    const notification = await this.notificationsRepository.findOne({
      where: { noti_user_id: userId },
    });
    if (
      notification.price_alert_device == price_alert_device_enum.Off &&
      notification.price_alert_email == price_alert_email_enum.Off
    ) {
      notification.price_alert_email = price_alert_email_enum.On;
      await this.notificationsRepository.save(notification);
    }
    return notification;
  }

  async updateNotificationStatus(userId: number, type: string) {
    Logger.log("Inside changeNotificationToggle ", "UserNotificationsService");
    var type_enum: any;
    var x: any;
    switch (type) {
      case "balance_email":
        type_enum = balance_email_enum;
        break;
      case "balance_device":
        type_enum = balance_device_enum;
        break;
      case "security_email":
        type_enum = security_email_enum;
        break;
      case "security_device":
        type_enum = security_device_enum;
        break;
      case "price_alert_device":
        type_enum = price_alert_device_enum;
        break;
      case "price_alert_email":
        type_enum = price_alert_email_enum;
        break;
      case "update_email":
        type_enum = update_email_enum;

      case "update_device":
        type_enum = update_device_enum;
        break;
      default:
        type_enum = null;
    }

    if (type_enum === null) {
      return "Invalid type";
    }
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });
    if (!user || user === null || user === undefined) {
      Logger.log("User not found", "UserNotificationsService");
      return null;
    } else {
      try {
        const notification = await this.notificationsRepository.findOne({
          where: { noti_user_id: userId },
        });
        if (
          !notification ||
          notification === null ||
          notification === undefined
        ) {
          Logger.log("Notification not found", "UserNotificationsService");
          return "No notification found";
        }
        const ts = notification[type];
        if (ts == type_enum.On) {
          Logger.log(ts, "On Found", "UserNotificationsService");
          notification[type] = type_enum.Off;
          return await this.notificationsRepository.save(notification);
        } else if (ts == type_enum.Off) {
          Logger.log(ts, "Off Found", "UserNotificationsService");
          notification[type] = type_enum.On;
          return await this.notificationsRepository.save(notification);
        }
        Logger.log("Notification not found", "UserNotificationsService");
        return null;
      } catch (error) {
        Logger.log(error, "Error", "UserNotificationsService");
        console.log(error);
        return null;
      }
    }
  }

  async createNotification(userId: number) {
    Logger.log(
      "Inside createNotification ",
      "UserNotificationsService:- createNotification"
    );
    const check_user = await this.getNotification(userId);
    if (check_user) {
      return null;
    }
    const notification = new NotificationsRepository();
    notification.noti_user_id = userId;
    const req_data = await axios
      .get("https://ipinfo.io")
      .then((res) => res.data);
    notification.modified_datetime = new Date();
    notification.modified_ip = req_data.ip;

    return await this.notificationsRepository.save(notification);
  }

  async save(notification: NotificationsRepository) {
    return await this.notificationsRepository.save(notification);
  }
}
