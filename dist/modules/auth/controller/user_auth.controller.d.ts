import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/modules/controllers/users-controller/users.service";
import { Repository } from "typeorm";
import { CreateUserAuth0 } from "../../dto/createUserAuth0";
import { UserNotificationsService } from "src/modules/controllers/user-noti-controller/user-notifications.service";
import { moleculus_user_address as AddressEntity, moleculus_user_notification as NotificationEntity } from "src/modules/entities";
import { moleculus_login_log as LoginLogEntity } from "../../entities/loginLog.entity";
import { moleculus_user as UserEntity } from "../../entities/user.entity";
export declare class ControllerController {
    private loginLogRepository;
    private jwtService;
    private readonly userRepository;
    private readonly notificationRepository;
    private readonly usersService;
    private readonly addressRepository;
    private readonly userNotificationsService;
    constructor(loginLogRepository: Repository<LoginLogEntity>, jwtService: JwtService, userRepository: Repository<UserEntity>, notificationRepository: Repository<NotificationEntity>, usersService: UsersService, addressRepository: Repository<AddressEntity>, userNotificationsService: UserNotificationsService);
    save_auth(req: any, res: any, createUserDto: CreateUserAuth0): Promise<any>;
    logout(req: any, res: any, body: any): Promise<any>;
    login(req: any, res: any, body: any): Promise<any>;
}
