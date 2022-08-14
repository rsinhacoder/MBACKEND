import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { moleculus_admin as AdminEntity } from "../../modules/entities/admin.entity";
import { CreateAdminDto } from "../dtos/Create-Admin.dto";
import { UpdateAdminDto } from "../dtos/Update-Admin.dto";
export declare class AdminAuthService {
    private readonly jwtService;
    private readonly adminRepository;
    constructor(jwtService: JwtService, adminRepository: Repository<AdminEntity>);
    updateTFAStatus(admin_id: number, isAuthStatus: boolean): Promise<AdminEntity>;
    VerifyTFA(admin_id: number, token: string): Promise<any>;
    getAdminById(admin_id: number): Promise<AdminEntity>;
    generateRandomUniqueDigits(): Promise<string>;
    checkEmail(email: string): Promise<AdminEntity>;
    registerAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity>;
    loginAdmin(email_id: string, password: string): Promise<boolean>;
    UpdateAdminProfile(updateAdminDto: UpdateAdminDto): Promise<AdminEntity>;
    ChangePasswordForced(email: any): Promise<string>;
    changePassword(email: string, old_password: string, new_password: string): Promise<AdminEntity>;
}
