import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  // moleculus_cities as CityEntity,
  moleculus_sip as SIPEntity,
  moleculus_sip_transactions as SIPTransactionsEntity,
  moleculus_states as StateEntity,
} from "../../modules/entities";
import { moleculus_pages as PagesEntity } from "../../modules/entities/pages.entity";
import { moleculus_settings as SettingsEntity } from "../../modules/entities/settings.entity";
import { status_Enum } from "../../modules/entities/user.entity";
import { moleculus_user_notification as UserNotificationEntity } from "../../modules/entities/userNotification.entity";
import { UpdateSettingsDto } from "../dtos/UpdateSetting.dto";
import { UpdateUserByAdminDto } from "../dtos/UpdateUserByAdminDto";
import {
  moleculus_countries as CountriesEntity,
  moleculus_index_tokens as IndexTokenEntity,
  moleculus_user_address as AddressEntity,
  moleculus_user_kyc as KycEntity,
} from "./../../modules/entities";
import { moleculus_email_template as EmailTemplateEntity } from "./../../modules/entities/email-template.entity";
import { moleculus_login_log as LoginLogEntity } from "./../../modules/entities/loginLog.entity";
import { page_status_enum } from "./../../modules/entities/pages.entity";
import { setting_status_enum } from "./../../modules/entities/settings.entity";
import {
  is_deleted_Enum,
  moleculus_user as UserEntity,
} from "./../../modules/entities/user.entity";
require("dotenv").config({ debug: false });

@Injectable()
export class CommonCrudService {
  //emailTemplateRepoistory
  constructor(
    @InjectRepository(IndexTokenEntity)
    private readonly indexTokenRepository: Repository<IndexTokenEntity>,
    @InjectRepository(UserNotificationEntity)
    private readonly notificationRepository: Repository<UserNotificationEntity>,
    @InjectRepository(CountriesEntity)
    private readonly countryRepository: Repository<CountriesEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRpository: Repository<AddressEntity>,
    @InjectRepository(LoginLogEntity)
    private readonly loginLogRepository: Repository<LoginLogEntity>,
    @InjectRepository(SIPEntity)
    private readonly sipRepository: Repository<SIPEntity>,
    @InjectRepository(SIPTransactionsEntity)
    private readonly sipTransactionsRepository: Repository<SIPTransactionsEntity>,
    @InjectRepository(PagesEntity)
    private readonly pagesRepository: Repository<PagesEntity>,
    @InjectRepository(SettingsEntity)
    private readonly settingsRepository: Repository<SettingsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EmailTemplateEntity)
    private readonly emailTemplateEntity: Repository<EmailTemplateEntity>,
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
    // @InjectRepository(CityEntity)
    // private readonly citiesRepository: Repository<CityEntity>,
    @InjectRepository(KycEntity)
    private readonly kycRepository: Repository<KycEntity>
  ) {}

  async changeUserDeleteStatus(user_id: number) {
    Logger.log(
      `Changing user delete status by user_id : ${user_id} }`,
      "CommonCrudService"
    );
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: user_id },
      });
      if (user.is_deleted == is_deleted_Enum.Yes) {
        user.is_deleted = is_deleted_Enum.No;
        await this.userRepository.save(user);
      } else if (user.is_deleted == is_deleted_Enum.No) {
        user.is_deleted = is_deleted_Enum.Yes;
        await this.userRepository.save(user);
      }
      return await this.userRepository.save(user);
    } catch (err) {
      Logger.error(err, "CommonCrudService");
      return null;
    }
  }
  async getUserKycDetails(user_id: number) {
    Logger.log(
      `Getting user kyc details by user_id : ${user_id} }`,
      "CommonCrudService"
    );
    try {
      const kyc_details = await this.kycRepository.findOne({
        where: { kyc_user_id: user_id },
        order: { kyc_id: "DESC" },
      });

      if (!kyc_details || kyc_details === null || kyc_details === undefined) {
        return null;
      }
      return kyc_details;
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  // async getCitiesList() {
  //   Logger.log(`Getting cities list`, "CommonCrudService");
  //   try {
  //     const cities = await this.citiesRepository.find({
  //       order: { city_country_id: "DESC", city_name: "ASC" },
  //     });
  //     return cities;
  //   } catch (e) {
  //     Logger.error(e, "CommonCrudService");
  //     return null;
  //   }
  // }

  async getStateList() {
    Logger.log(`Getting state list`, "CommonCrudService");
    try {
      const states = await this.stateRepository.find({
        order: { state_country_id: "DESC", state_name: "ASC" },
      });
      return states;
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async getCountryList() {
    const countries = await this.countryRepository.find({
      order: { country_name: "ASC" },
    });
    return countries;
  }

  async changeUserStatus(user_id: number) {
    Logger.log(
      `Changing user status by user_id : ${user_id} }`,
      "CommonCrudService"
    );
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: user_id },
      });
      if (!user || user === null || user === undefined) {
        return null;
      } else {
        if (user.status == status_Enum.Enable) {
          user.status = status_Enum.Disable;
          await this.userRepository.save(user);
          user.password = "";
          return user;
        }
        if (user.status == status_Enum.Disable) {
          user.status = status_Enum.Enable;
          await this.userRepository.save(user);
          user.password = "";
          return user;
        }
      }
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async getSipOfaUserByTokenCode(token_code: string, user_id) {
    Logger.log(
      `Getting sip details by token_code : ${token_code}`,
      "CommonCrudService"
    );
    try {
      const sip = await this.sipTransactionsRepository.find({
        where: { token_code: token_code, tra_user_id: user_id },
      });
      // return sip;
      if (!sip || sip === null || sip === undefined) {
        return null;
      } else {
        return sip;
      }
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async getUserSips(user_id: number) {
    Logger.log(
      `Getting user sips by user_id : ${user_id}`,
      "CommonCrudService"
    );

    try {
      const user_sips = await this.sipRepository.find({
        where: { sip_user_id: user_id },
      });
      return user_sips;
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async getNotifications(user_id: number) {
    Logger.log(
      `Getting User Notifications by user_id: ${user_id}`,
      "CommonCrudService"
    );
    const user_check = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    if (!user_check || user_check === null || user_check === undefined) {
      return null;
    } else {
      try {
        const notifications = await this.notificationRepository.findOne({
          where: { noti_user_id: user_id },
        });
        if (
          !notifications ||
          notifications === null ||
          notifications === undefined
        ) {
          return null;
        } else {
          return notifications;
        }
      } catch (err) {
        Logger.log("Error", "UserService");
        return null;
      }
    }
  }

  async getCountOfRepositoryEntries2() {
    Logger.log(`Getting Repository entries count of`, "CommonCrudService");
    try {
      var pageresult = await this.pagesRepository.count();
      //var emailtemplateresult = await this.emailTemplateRepoistory.count();
      var settingresult = await this.settingsRepository.count();
      var emailresult = await this.emailTemplateEntity.count({
        where: { is_deleted: false },
      });
      var tokenresult = await this.indexTokenRepository.count();
      var totalusersresult = await this.userRepository.count();
      var totalusersresultindia = await this.userRepository.count({
        where: { country_id: 2 },
      });
      var enableuserresultIndia = await this.userRepository.count({
        where: {
          status: status_Enum.Enable,
          country_id: 2,
        },
      });
      var disableuserresultIndia = await this.userRepository.count({
        where: {
          status: status_Enum.Disable,
          country_id: 2,
        },
      });
      var totalusersresultusa = await this.userRepository.count({
        where: { country_id: 1 },
      });
      var enableuserresultusa = await this.userRepository.count({
        where: {
          status: status_Enum.Enable,
          country_id: 1,
        },
      });

      //query builder:
      var enableusersusa2 = await this.userRepository
        .createQueryBuilder("user")
        .where("user.status = :status", { status: status_Enum.Enable })
        .andWhere("user.country_id = :country_id", {
          country_id: 1,
        })
        .getCount();

      var disableuserresultusa = await this.userRepository.count({
        where: {
          status: status_Enum.Disable,
          country_id: 1,
        },
      });

      var disableuserresult = await this.userRepository.count({
        where: { status: status_Enum.Disable },
      });
      return {
        pageresult: pageresult,
        settingresult: settingresult,
        emailresult: emailresult,
        //indexresult: indexresult,
        totalusersresultindia: enableuserresultIndia + disableuserresultIndia,
        enableuserresultIndia: enableuserresultIndia,
        disableuserresultindia: disableuserresultIndia,
        totalusersresultusa: enableuserresultusa + disableuserresultusa,
        //enableuserresultusa: enableuserresultusa,
        enableuserresultusa: enableusersusa2,
        disableuserresultusa: disableuserresultusa,
        disableuserresult: disableuserresult,
        tokenresult: tokenresult,
        totalusersresult: totalusersresult,
      };
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async getById(id: number, repository: string) {
    Logger.warn(
      `Getting ${repository} Repository entry by id: ${id}`,
      "CommonCrudService"
    );
    let result: any;
    if (repository === "pages" || repository === "pages_entity") {
      try {
        result = await this.pagesRepository.findOne({
          where: { pagetitle_id: id },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "settings" || repository === "settings_entity") {
      try {
        result = await this.settingsRepository.findOne({
          where: { setting_id: id },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (
      repository === "email_templates" ||
      repository === "email_templates_entity"
    ) {
      try {
        result = await this.emailTemplateEntity.findOne({
          where: { email_template_id: id },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
  }

  async getAddressDetails(id: number) {
    Logger.log(`Getting address details by id --: ${id}`, "CommonCrudService");
    try {
      const address = await this.addressRpository.findOne({
        where: { user_address_id: id },
      });
      return address;
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async getAllUsers() {
    try {
      return this.userRepository.find({
        order: { user_id: "DESC" },
      });
    } catch (err) {
      Logger.log("Error", "UserService");
      return null;
    }
  }

  async getUserDetailsById(id: number) {
    Logger.log(`Getting User Details by id: ${id}`, "CommonCrudService");
    let result: any;
    try {
      //arrange in ascending order:
      result = await this.userRepository.findOne({
        where: { user_id: id },
      });
      Logger.log(`User Details by id: ${id} Got`, "CommonCrudService");
      return result;
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
  }

  async updateUserById(id: number, data: UpdateUserByAdminDto) {
    Logger.log(
      `Updating user by id: ${id} with data: ${JSON.stringify(data)}`,
      "CommonCrudService"
    );
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: id },
      });
      if (user) {
        if (data.first_name != null) {
          user.first_name = data.first_name;
        }
        if (data.last_name != null) {
          user.last_name = data.last_name;
        }
        if (data.email != null) {
          user.email_id = data.email;
        }
        if (data.mobileNumber != null) {
          user.phone_number = data.mobileNumber;
        }
        if (data.dob != null) {
          user.dob = data.dob;
        }
        if (data.tin != null) {
          user.tin = data.tin;
        }
        if (data.citizenship != null) {
          user.citizenship = data.citizenship;
        }
        if (data.zipcode != null) {
          user.zipcode = data.zipcode;
        }
        if (data.city != null) {
          user.city = data.city;
        }
        if (data.state != null) {
          user.state_name = data.state;
        }

        await this.userRepository.save(user);

        const user_address = await this.addressRpository.findOne({
          where: { user_address_id: id },
        });
        if (user_address) {
          if (data.address1 != null) {
            user_address.address_line1 = data.address1;
          }
          if (data.address2 != null) {
            user_address.address_line2 = data.address2;
          }
          if (data.other_info != null) {
            user_address.other_info = data.other_info;
          }
          await this.addressRpository.save(user_address);
        }
        return user;
      }
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
    return true;
  }

  async updateSettingsById(id: number, updateSettingDto: UpdateSettingsDto) {
    Logger.log(`Updating settings by id: ${id} )}`, "CommonCrudService");
    try {
      const settings = await this.settingsRepository.findOne({
        where: { setting_id: id },
      });
      if (settings) {
        if (updateSettingDto.setting_value != null) {
          settings.setting_value = updateSettingDto.setting_value;
        }
        await this.settingsRepository.save(settings);
        return settings;
      }
    } catch (e) {
      Logger.error(e, "CommonCrudService");
      return null;
    }
    return true;
  }

  async getEnabledUsers() {
    try {
      return this.userRepository.count({
        where: { status: status_Enum.Enable },
      });
    } catch (err) {
      Logger.log("Error", "UserService");
      return null;
    }
  }

  async getDisabledUsers() {
    try {
      return this.userRepository.count({
        where: { status: status_Enum.Disable },
      });
    } catch (err) {
      Logger.log("Error", "UserService");
      return null;
    }
  }

  async getAll(repository: string) {
    Logger.log(`Getting ${repository} Repository entries`, "CommonCrudService");
    let result: any;
    if (repository === "pages" || repository === "pages_entity") {
      try {
        result = await this.pagesRepository.find({
          order: {
            pagetitle_id: "ASC",
          },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "settings" || repository === "settings_entity") {
      try {
        result = await this.settingsRepository.find({
          order: {
            setting_id: "ASC",
          },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (
      repository === "email_templates" ||
      repository === "email_templates_entity"
    ) {
      try {
        result = await this.emailTemplateEntity.find({
          order: {
            email_template_id: "ASC",
          },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    } else {
      Logger.error(`${repository} Repository not found`, "CommonCrudService");
      return null;
    }
  }

  async getRepoContent(repository: string) {
    Logger.warn(
      `Getting ${repository} Repository's content`,
      "CommonCrudService"
    );
    let result: any;
    if (repository === "pages" || repository === "pages_entity") {
      try {
        result = await this.pagesRepository.find({});
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "settings" || repository === "settings_entity") {
      try {
        result = await this.settingsRepository.find({});
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (
      repository === "email_templates" ||
      repository === "email_templates_entity"
    ) {
      try {
        result = await this.settingsRepository.find({});
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "login_log" || repository === "login_log_entity") {
      try {
        result = await this.loginLogRepository.find({
          order: {
            log_in_datetime: "DESC",
          },
        });
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
  }

  async updateStatus(id: number, repository: string) {
    Logger.warn(
      `Updating ${repository} Repository's status entry by id: ${id}`,
      "CommonCrudService"
    );
    let result: any;
    if (repository === "pages" || repository === "pages_entity") {
      try {
        result = await this.pagesRepository.findOne({
          where: { pagetitle_id: id },
        });

        if (!result.page_status || result.page_status === null) {
          return null;
        }
        if (result.page_status === page_status_enum.Enable) {
          result.page_status = page_status_enum.Disable;
          return await this.pagesRepository.save(result);
        }
        if (result.page_status === page_status_enum.Disable) {
          result.page_status = page_status_enum.Enable;
          return await this.pagesRepository.save(result);
        }
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "settings" || repository === "settings_entity") {
      try {
        result = await this.settingsRepository.findOne({
          where: { setting_id: id },
        });

        if (!result.setting_status || result.setting_status === null) {
          return null;
        }
        if (result.setting_status === setting_status_enum.Enable) {
          result.setting_status = setting_status_enum.Disable;
          return await this.settingsRepository.save(result);
        }
        if (result.setting_status === setting_status_enum.Disable) {
          result.setting_status = setting_status_enum.Enable;
          return await this.settingsRepository.save(result);
        }
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
  }

  async deleteSoft(id: number, repository: string) {
    Logger.log(
      `Deleting ${repository} Repository entry by id: ${id}`,
      "CommonCrudService"
    );
    let result: any;
    if (repository === "pages" || repository === "pages_entity") {
      try {
        result = await this.pagesRepository.findOne({
          where: { pagetitle_id: id },
        });
        result.is_deleted = true;
        return await this.pagesRepository.save(result);
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "settings" || repository === "settings_entity") {
      try {
        result = await this.settingsRepository.findOne({
          where: { setting_id: id },
        });
        result.is_deleted = true;
        return await this.settingsRepository.save(result);
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }

    if (
      repository === "email_templates" ||
      repository === "email_templates_entity"
    ) {
      try {
        result = await this.settingsRepository.findOne({
          where: { setting_id: id },
        });
        result.is_deleted = true;
        return await this.settingsRepository.save(result);
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
  }

  async getCountOfRepositoryEntries(repository: string) {
    Logger.log(
      `Getting Repository entries count of ${repository}`,
      "CommonCrudService"
    );
    let result: any;
    if (repository === "pages" || repository === "pages_entity") {
      try {
        result = await this.pagesRepository.count();
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (repository === "settings" || repository === "settings_entity") {
      try {
        result = await this.settingsRepository.count();
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    if (
      repository === "email_templates" ||
      repository === "email_templates_entity"
    ) {
      try {
        result = await this.emailTemplateEntity.count();
        return result;
      } catch (e) {
        Logger.error(e, "CommonCrudService");
        return null;
      }
    }
    Logger.error(`${repository} Repository not found`, "CommonCrudService");
    return null;
  }
}
