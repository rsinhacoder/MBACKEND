// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";

// import { Repository } from "typeorm";
// import { moleculus_login_log as LoginLogRepository } from "../../modules/entities/loginLog.entity";

// require("dotenv").config({ debug: false });

// @Injectable()
// export class UtilsService {
//   constructor(
//     @InjectRepository(LoginLogRepository)
//     private readonly loginLogRepository: Repository<LoginLogRepository>
//   ) {}

//   async getUserLog() {
//     const userLog_count = await this.loginLogRepository.find({});

//     if (
//       !userLog_count ||
//       userLog_count.length === 0 ||
//       userLog_count === null
//     ) {
//       return null;
//     } else {
//       console.log(userLog_count);
//     }
//   }
// }
