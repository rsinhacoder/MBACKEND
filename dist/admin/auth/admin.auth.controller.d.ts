import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/utils/mail/mail.service";
import { Repository } from "typeorm";
import { moleculus_admin as AdminEntity } from "../../modules/entities/admin.entity";
import { CreateAdminDto } from "../dtos/Create-Admin.dto";
import { UpdateAdminDto } from "../dtos/Update-Admin.dto";
import { AdminAuthService } from "./admin.auth.service";
export declare class AdminAuthController {
    private readonly jwtService;
    private readonly adminAuthService;
    private readonly mailService;
    private readonly adminRepository;
    constructor(jwtService: JwtService, adminAuthService: AdminAuthService, mailService: MailService, adminRepository: Repository<AdminEntity>);
    ping(): Promise<{
        code: string;
        status: string;
        message: string;
        data: {
            time: string;
            metadata: any;
        };
    }>;
    registerAdmin(createAdminDto: CreateAdminDto): Promise<{
        code: string;
        status: string;
        message: string;
        data: any[];
    } | {
        code: string;
        status: string;
        message: string;
        data: {
            admin_id: number;
        };
    }>;
    sendMail(res: any, body: any): Promise<any>;
    verifyTFA(res: any, body: any): Promise<any>;
    checkEmail(body: any, res: any): Promise<any>;
    UpdateAdminProfile(updateAdminDto: UpdateAdminDto, res: any): Promise<any>;
    toggleTfaStatus(body: any, res: any): Promise<any>;
    getAdminDetails(res: any, id: string): Promise<any>;
    loginAdmin(body: any): Promise<{
        code: string;
        status: string;
        message: string;
        data: {
            token: string;
            admin_id: number;
            admin_email: string;
            first_name: string;
            last_name: string;
            username: string;
            isGoogleAuthEnabled: import("../../modules/entities/admin.entity").google_auth_enabled_Enum;
        };
    }>;
    changePassword(body: any): Promise<{
        code: string;
        status: string;
        message: string;
        data: any;
    }>;
}
