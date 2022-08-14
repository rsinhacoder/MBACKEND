import { Request as RequestEx, Response } from "express";
import { moleculus_user_notification as NotificationEntity } from "src/modules/entities/userNotification.entity";
import { Repository } from "typeorm";
import { UserNotificationsService } from "./user-notifications.service";
export declare class UserNotificationsController {
    private readonly userNotificationsService;
    private readonly notificationRepository;
    constructor(userNotificationsService: UserNotificationsService, notificationRepository: Repository<NotificationEntity>);
    updateNotificationStatus(req: RequestEx, res: Response, body: any): Promise<Response<any, Record<string, any>>>;
}
