import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Req,
  Response
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { UsersService } from "src/modules/controllers/users-controller/users.service";
import { comparePassword } from "src/utils/bcrypt/bcrypt";
import { encrypt } from "src/utils/bcrypt/encryption";
import { Repository } from "typeorm";
import { CreateUserAuth0 } from "../../dto/createUserAuth0";
const speakeasy = require("speakeasy");

import { UserNotificationsService } from "src/modules/controllers/user-noti-controller/user-notifications.service";
import {
  moleculus_user_address as AddressEntity,
  moleculus_user_notification as NotificationEntity
} from "src/modules/entities";
import { moleculus_login_log as LoginLogEntity } from "../../entities/loginLog.entity";
import {
  is_deleted_Enum,
  moleculus_user as UserEntity,
  status_Enum
} from "../../entities/user.entity";
require("dotenv").config({ debug: false });
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

@Controller("users/auth")
export class ControllerController {
  constructor(
    @InjectRepository(LoginLogEntity)
    private loginLogRepository: Repository<LoginLogEntity>,
    // @Inject("JWT_SERVICE")
    private jwtService: JwtService,
    // private usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @Inject("USER_SERVICE") private readonly usersService: UsersService,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @Inject("NOTIFICATIONS_SERVICE")
    private readonly userNotificationsService: UserNotificationsService
  ) {}

  //save auth_0 response:
  @Post("/auth0")
  async save_auth(
    @Req() req,
    @Response() res,
    @Body() createUserDto: CreateUserAuth0
  ) {
    Logger.log("Inside save_auth ", "UserAuthController:- save_auth");
    try {
      const user_email_check = await this.userRepository.findOne({
        where: {
          email_id: createUserDto.auth_response.email,
        },
      });

      // If user already exists:
      if (user_email_check) {
        if (user_email_check.is_deleted === is_deleted_Enum.Yes) {
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "User is deleted",
            data: [],
          });
        }
        if (user_email_check.status === status_Enum.Disable) {
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "User is disabled",
            data: [],
          });
        }
        var token = await this.jwtService.sign(
          {
            username: `${user_email_check.first_name} 
            ${user_email_check.last_name}`,
          },
          { secret: `${process.env.JWT_SECRET}`, expiresIn: "1500s" }
        );
        const login_log = new LoginLogEntity();
        login_log.logged_user_email = user_email_check.email_id;
        login_log.logged_user_id = user_email_check.user_id.toString();
        login_log.logged_user_name = `${user_email_check.first_name} ${user_email_check.last_name}`;
        login_log.log_in_datetime = new Date();
        const req_data = await axios
          .get("https://ipinfo.io")
          .then((res) => res.data);
        login_log.logged_user_ip = req_data ? req_data.ip : "";
        await this.loginLogRepository.save(login_log);

        return res.status(200).json({
          code: "200",
          status: "success",
          message: "Login Successful",
          data: {
            user_id: user_email_check.user_id,
            JWTtoken: token,
            isSignupDone: user_email_check.isSignupFilled,
            isAddressUpdated: user_email_check.isAddressFilled,
            isPersonalUpadted: user_email_check.isPersonalFilled,
            isDeleted: user_email_check.is_deleted,
          },
        });
      }

      //New User:
      const temp = JSON.stringify(createUserDto.auth_response);
      const user = await this.userRepository.create(createUserDto);
      var token = await this.jwtService.sign(
        {
          username: `${createUserDto.auth_response.given_name} ${createUserDto.auth_response.family_name}`,
        },
        { secret: `${process.env.JWT_SECRET}`, expiresIn: "1500s" }
      );

      var temp_secret_generated = await speakeasy.generateSecret();
      var google_auth_code = temp_secret_generated.base32;
      user.temp_secret = temp_secret_generated;
      user.google_auth_code = google_auth_code;

      user.first_name = createUserDto.auth_response.given_name
        ? createUserDto.auth_response.given_name
        : "Test First Name";
      user.email_id = createUserDto.auth_response.email;
      user.last_name = createUserDto.auth_response.family_name
        ? createUserDto.auth_response.family_name
        : "Test Last Name";
      user.auth_o_response = encrypt(temp);
      user.legalname =
        createUserDto.auth_response.given_name +
        " " +
        createUserDto.auth_response.family_name;

      // user.auth_o_response_decrypted = JSON.parse(decrypt(encrypt(temp)));
      const saved = await this.userRepository.save(user);
      if (saved === undefined || saved === null) {
        return res.status(400).json({
          code: "400",
          status: "failure",
          message: "Error Occured, User not created",
          data: [],
        });
      }

      //create the address:
      const adress_confirmation = await this.usersService.createAddress(
        user.user_id
      );
      if (adress_confirmation == null || adress_confirmation == undefined) {
        Logger.error("New Address not created, Address for the user exists");
      } else {
        Logger.log("New Address created");
      }

      //create the LoginLogs:
      const login_log = new LoginLogEntity();
      login_log.logged_user_email = createUserDto.auth_response.email;
      login_log.logged_user_id = user.user_id.toString();
      login_log.logged_user_name = `${createUserDto.auth_response.given_name} ${createUserDto.auth_response.family_name}`;
      login_log.log_in_datetime = new Date();
      const req_data_ = await axios
        .get("https://ipinfo.io")
        .then((res) => res.data);
      login_log.logged_user_ip = req_data_ ? req_data_.ip : "";
      login_log.logged_user_country_of_login = req_data_
        ? req_data_.country
        : "";

      await this.loginLogRepository.save(login_log);
      await this.userRepository.save(user);

      //create new notification:
      const notification = new NotificationEntity();
      notification.noti_user_id = user.user_id;
      const req_data = await axios
        .get("https://ipinfo.io")
        .then((res) => res.data);
      notification.modified_datetime = new Date();
      notification.modified_ip = req_data ? req_data.ip : "";
      const noti_check = await this.notificationRepository.findOne({
        where: {
          noti_user_id: user.user_id,
        },
      });
      if (noti_check !== undefined && noti_check !== null) {
        Logger.log(
          "Notification already exists",
          "UserAuthController:- save_auth"
        );
      } else {
        const noti = await this.notificationRepository.save(notification);
        if (noti) {
          Logger.log("Notification created", "UserAuthController:- save_auth");
        }
      }
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Login Successful",
        data: {
          user_id: user.user_id,
          JWTtoken: token,
          otp_auth_url: user.temp_secret.otpauth_url,
          google_auth_code: user.google_auth_code,
          isSignupDone: user.isSignupFilled,
          isAddressUpdated: user.isAddressFilled,
          isPersonalUpdated: user.isPersonalFilled,
        },
      });
    } catch (error) {}
  }

  @Post("/logout")
  async logout(@Req() req, @Response() res, @Body() body: any) {
    Logger.log("Inside logout ", "UserAuthController:- logout");
    try {
      const user_id = body.user_id;
      const jwt = body.jwt;
      // check if user is logged in:
      const login_log = await this.userRepository.findOne({
        where: {
          user_id: user_id,
        },
      });
      if (login_log === undefined || login_log === null) {
        return res.status(400).json({
          code: "400",
          status: "failure",
          message: "No User Exists",
          data: [],
        });
      } else {
        const result = await this.loginLogRepository.update(
          { logged_user_id: user_id },
          { log_out_datetime: new Date() }
        );
        if (result) {
          return res.status(200).json({
            code: "200",
            status: "success",
            message: "logged out Succesfully",
            data: [],
          });
        }
      }
    } catch (error) {
      Logger.error(error, "UserAuthController:- logout");
    }
  }

  @Post("/login")
  async login(@Req() req, @Response() res, @Body() body) {
    Logger.log("Inside login controller", "UserAuthController");
    var token;
    const { email_id, password } = body;
    const user_check = await this.userRepository.findOne({
      where: { email_id },
    });
    if (!user_check) {
      Logger.log("User not found", "UserAuthController");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "User not found",
        data: [],
      });
    } else {
      const is_Matched = await comparePassword(password, user_check.password);
      try {
        if (!is_Matched) {
          Logger.log("Password not matched", "UserAuthController");
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Password not matched",
            data: [],
          });
        } else {
          Logger.log("Password matched", "UserAuthController");

          token = await this.jwtService.sign(
            {
              username: `${user_check.first_name} ${user_check.last_name}`,
            },
            { secret: `${process.env.JWT_SECRET}`, expiresIn: "1080h" }
          );
          const login_log = new LoginLogEntity();
          login_log.logged_user_email = user_check.email_id;
          login_log.logged_user_id = user_check.user_id.toString();
          login_log.logged_user_name = `${user_check.first_name} ${user_check.last_name}`;
          login_log.log_in_datetime = new Date();

          const req_data = await axios
            .get("https://ipinfo.io")
            .then((res) => res.data);
          login_log.logged_user_ip = req_data.ip;
          login_log.logged_user_country_of_login = req_data.country;

          await this.loginLogRepository.save(login_log);

          return res.status(400).json({
            code: "200",
            status: "success",
            message: "JWT token assigned",
            data: {
              user_id: user_check.user_id,

              token,
            },
          });
        }
      } catch (error) {
        Logger.error(error);
        return res.status(400).json({
          code: "400",
          status: "error",
          message: " Error Occured ",
          data: null,
        });
      }
    }
  }
}
