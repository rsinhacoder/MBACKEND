import { Repository } from "typeorm";
import { User as UserEntity } from "../../modules/entities";
export declare class BatchJobService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getBatchJob(user_id: string): Promise<UserEntity>;
}
