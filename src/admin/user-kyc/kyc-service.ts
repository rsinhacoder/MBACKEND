import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  kyc_status_enum,
  moleculus_user_kyc as KYCEntity,
} from "../../modules/entities/userKYC.entity";
import {
  document_Type_Enum,
  moleculus_user as UserEntity,
} from "../../modules/entities/user.entity";
import axios from "axios";
require("dotenv").config({ debug: false });

@Injectable()
export class KYCService {
  constructor(
    @InjectRepository(KYCEntity)
    private readonly kycEntity: Repository<KYCEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>
  ) {}

  async changekycstatus(user_id: string, required_status: string) {
    Logger.log("changekycstatus", "KYCService");

    var user_detail = await this.userEntity.findOne({
      where: { user_id: parseInt(user_id) },
    });
    var user_country_id = user_detail.country_id;

    try {
      const user_id_ = parseInt(user_id);
      const user = await this.kycEntity.findOne({
        where: { kyc_user_id: user_id_ },
        order: { kyc_id: "DESC" },
      });
      if (user) {
        if (required_status === "Pending") {
          user.kyc_status = kyc_status_enum.Pending;
          if (
            user_detail.country_name == "USA" ||
            user_detail.country_name == "usa" ||
            user_detail.country_name == "Usa"
          ) {
            const req_data = await axios
              .get("https://ipinfo.io")
              .then((res) => res.data)
              .catch((err) => {
                req_data: "";
              });
            const new_kyc = await this.kycEntity.create({
              kyc_user_id: user_id_,
              kyc_status: kyc_status_enum.Pending,
              created_datetime: new Date(),
              created_ip: req_data.ip ? req_data.ip : "",
            });
            await this.kycEntity.save(new_kyc);

            user.api_repsonse = `KYC changed to ${required_status} by Admin @ ${new Date().toLocaleString()} by IP: ${
              req_data.ip ? req_data.ip : "NA"
            }`;
            await this.kycEntity.save(user);
          } else {
            const req_data = await axios
              .get("https://ipinfo.io")
              .then((res) => res.data)
              .catch((err) => {
                req_data: "";
              });
            user.api_repsonse = `KYC changed to ${required_status} by Admin @ ${new Date().toLocaleString()} by IP: ${
              req_data.ip ? req_data.ip : "NA"
            }`;
            await this.kycEntity.save(user);
          }
          return user;
        }
        if (required_status === "Completed") {
          if (user_country_id === 1) {
            user.token = `${Math.floor(
              Math.random() * 1000000000000
            ).toString()}-${Math.floor(
              Math.random() * 1000000000000
            ).toString()} `;
          }
          user.kyc_status = kyc_status_enum.Completed;
          const req_data = await axios
            .get("https://ipinfo.io")
            .then((res) => res.data)
            .catch((err) => {
              req_data: "";
            });
          user.api_repsonse = `KYC changed to ${required_status} by Admin @ ${new Date().toLocaleString()} by IP: ${
            req_data.ip ? req_data.ip : "NA"
          }`;
          await this.kycEntity.save(user);
          return user;
        }
        if (required_status === "Rejected") {
          if (user_country_id === 1) {
            user.api_repsonse = "Rejected_By_Admin";
            user.token = null;
            user.vendor_id = null;
            await this.kycEntity.save(user);
          }
          if (user_country_id == 2) {
            user_detail.isPersonalFilled = 0;
            user_detail.isAddressFilled = 0;
            user_detail.phone_number = user_detail.document_value = null;
            user_detail.document_type = document_Type_Enum.PAN;
            await this.userEntity.save(user_detail);
          }
          user.kyc_status = kyc_status_enum.Rejected;
          await this.kycEntity.save(user);
          return user;
        }
        return null;
      }
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }
}
