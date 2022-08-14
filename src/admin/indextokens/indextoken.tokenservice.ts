// import { Inject, Injectable, Logger } from "@nestjs/common";

// import { InjectRepository } from "@nestjs/typeorm";
// import axios from "axios";
// import { Repository } from "typeorm";
// i
// import { comparePasswordAdmin, encodePasswordAdmin } from "./utils/bcrypt";
// require("dotenv").config({ debug: false });
// @Injectable()
// export class IndexService {
//   constructor(
//     @InjectRepository(AdminEntity)
//     private readonly adminRepository: Repository<AdminEntity>
//   ) {}

//   async generateRandomUniqueDigits() {
//     const length = 5;
//     let result = "";
//     const characters = "0123456789";
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }

//   async checkEmail(email: string) {
//     try {
//       const check_admin = await this.adminRepository.findOne({
//         where: { email_id: email },
//       });
//       if (!check_admin || check_admin === null || check_admin === undefined) {
//         return null;
//       } else {
//         check_admin.password = "";
//         return check_admin;
//       }
//     } catch (error) {
//       Logger.error(error, "AdminAuthService");
//       return null;
//     }
//   }
//   async registerAdmin(createAdminDto: CreateAdminDto) {
//     try {
//       const password_encoded = encodePasswordAdmin(createAdminDto.password);

//       const admin = new AdminEntity();
//       admin.first_name = createAdminDto.first_name;
//       admin.last_name = createAdminDto.last_name;
//       admin.email_id = createAdminDto.email_id;
//       admin.password = password_encoded;
//       admin.created_datetime = new Date();
//       const req_data = await axios
//         .get("https://ipinfo.io")
//         .then((res) => res.data);
//       admin.created_ip = req_data ? req_data.ip : "";
//       var uniqueDigits = await this.generateRandomUniqueDigits();
//       admin.admin_slug =
//         createAdminDto.first_name.toLowerCase() +
//         "_" +
//         createAdminDto.last_name.toLowerCase() +
//         "_" +
//         uniqueDigits;
//       return await this.adminRepository.save(admin);
//     } catch (error) {
//       Logger.error(error, "AdminAuthService");
//       return null;
//     }
//   }
//   async loginAdmin(email_id: string, password: string) {
//     try {
//       const check_admin = await this.adminRepository.findOne({
//         where: { email_id: email_id },
//       });
//       if (!check_admin) {
//         return null;
//       }
//       const password_encoded = check_admin.password;
//       const is_verified = comparePasswordAdmin(password, password_encoded);
//       if (!is_verified || is_verified === null || is_verified === undefined) {
//         return null;
//       } else {
//         return true;
//       }
//     } catch (error) {
//       Logger.error(error, "AdminAuthService");
//       return null;
//     }
//   }

//   async UpdateAdminProfile(updateAdminDto: UpdateAdminDto) {
//     Logger.log(
//       `UpdateAdminProfile ${updateAdminDto.admin_id}`,
//       "AdminAuthService"
//     );
//     const admin_id = updateAdminDto.admin_id;
//     const admin = await this.adminRepository.findOne({
//       where: { admin_id: parseInt(admin_id) },
//     });

//     if (!admin || admin === null || admin === undefined) {
//       Logger.error("Admin not found", "AdminAuthService");
//       return null;
//     } else {
//       console.log(admin);
//       if (
//         updateAdminDto.first_name !== null &&
//         updateAdminDto.first_name !== undefined
//       ) {
//         admin.first_name = updateAdminDto.first_name;
//       }
//       if (
//         updateAdminDto.last_name !== null &&
//         updateAdminDto.last_name !== undefined
//       ) {
//         admin.last_name = updateAdminDto.last_name;
//       }

//       if (
//         updateAdminDto.email_id !== null &&
//         updateAdminDto.email_id !== undefined
//       ) {
//         admin.email_id = updateAdminDto.email_id;
//       }
//       if (
//         updateAdminDto.username !== null &&
//         updateAdminDto.username !== undefined
//       ) {
//         admin.username = updateAdminDto.username;
//       }

//       return await this.adminRepository.save(admin);
//     }
//   }

//   async changePassword(
//     email: string,
//     old_password: string,
//     new_password: string
//   ) {
//     try {
//       const check_admin = await this.adminRepository.findOne({
//         where: { email_id: email },
//       });
//       if (!check_admin || check_admin === null || check_admin === undefined) {
//         return null;
//       } else {
//         const verified = comparePasswordAdmin(
//           old_password,
//           check_admin.password
//         );
//         if (!verified) {
//           return null;
//         } else if (verified) {
//           const password_encoded = encodePasswordAdmin(new_password);
//           check_admin.password = password_encoded;
//           return await this.adminRepository.save(check_admin);
//         }
//       }
//       return null;
//     } catch (error) {
//       Logger.error(error, "AdminAuthService");
//       return null;
//     }
//   }
// }
