import { Repository } from "typeorm";
import { moleculus_user as UserEntity } from "../../entities/user.entity";
import { moleculus_user_notification as NotificationsRepository } from "../../entities/userNotification.entity";
export declare class UserNotificationsService {
    private readonly notificationsRepository;
    private readonly userRepository;
    constructor(notificationsRepository: Repository<NotificationsRepository>, userRepository: Repository<UserEntity>);
    getNotification(userId: number): Promise<NotificationsRepository>;
    updateNotificationStatus(userId: number, type: string): Promise<NotificationsRepository | "Invalid type" | "No notification found">;
    createNotification(userId: number): Promise<NotificationsRepository>;
    save(notification: NotificationsRepository): Promise<NotificationsRepository>;
}
