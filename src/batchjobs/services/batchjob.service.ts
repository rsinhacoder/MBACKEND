//generate dummy service nest js:

import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User as UserEntity } from "../../modules/entities";

@Injectable()
export class BatchJobService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getBatchJob(user_id: string) {
    Logger.log("getBatchJob", "BatchJobService");
    var user_ = await this.userRepository.findOne({
      where: { user_id: parseInt(user_id) },
    });
    return user_;
  }
}
