import { Repository } from "typeorm";
import { moleculus_user_kyc as KYCEntity } from "../../modules/entities/userKYC.entity";
import { moleculus_user as UserEntity } from "../../modules/entities/user.entity";
export declare class KYCService {
    private readonly kycEntity;
    private readonly userEntity;
    constructor(kycEntity: Repository<KYCEntity>, userEntity: Repository<UserEntity>);
    changekycstatus(user_id: string, required_status: string): Promise<KYCEntity>;
}
