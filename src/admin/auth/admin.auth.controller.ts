const axios = require("axios");
import {
  Body,
  Controller,
  Inject,
  Logger,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { MailService } from "src/utils/mail/mail.service";
import { Repository } from "typeorm";
import { moleculus_admin as AdminEntity } from "../../modules/entities/admin.entity";
import { CreateAdminDto } from "../dtos/Create-Admin.dto";
import { UpdateAdminDto } from "../dtos/Update-Admin.dto";
import { AdminAuthService } from "./admin.auth.service";

const speakeasy = require("speakeasy");

@Controller("admin/auth")
export class AdminAuthController {
  constructor(
    @Inject("JWT_SERVICE")
    private readonly jwtService: JwtService,
    @Inject("ADMIN_AUTH_SERVICE")
    private readonly adminAuthService: AdminAuthService,
    @Inject("MAIL_SERVICE") private readonly mailService: MailService,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  //Ping the Server:
  @Post("ping")
  async ping() {
    var ip_data;
    const req_data = await axios
      .get("https://ipinfo.io")
      .then((res) => {
        ip_data = res.data;
      })
      .catch((err) => {
        ip_data = err;
      });
    return {
      code: "200",
      status: "success",
      message: "Server is running",
      data: {
        time:
          new Date().toISOString().split("T")[0] +
          " " +
          new Date().toLocaleTimeString(),
        metadata: ip_data,
      },
    };
  }
  //register Admin:
  @Post("register")
  @UsePipes(ValidationPipe)
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    const { email_id, password } = createAdminDto;
    const admin_check = await this.adminAuthService.checkEmail(email_id);
    if (admin_check) {
      return {
        code: "400",
        status: "error",
        message: "Admin already exist",
        data: [],
      };
    }
    const result = await this.adminAuthService.registerAdmin(createAdminDto);
    if (!result || result === null || result === undefined) {
      return {
        code: "400",
        status: "error",
        message: "Error Occured in Registering Admin",
        data: [],
      };
    } else {
      return {
        code: "200",
        status: "success",
        message: "Admin Registered successfully",
        data: { admin_id: result.admin_id },
      };
    }
  }

  @Post("sendmail")
  async sendMail(@Res() res: any, @Body() body: any) {
    const { admin_id, email_id } = body;
    console.log(body);
    const is_admin_exist = await this.adminAuthService.checkEmail(email_id);
    if (
      !is_admin_exist ||
      is_admin_exist === null ||
      is_admin_exist === undefined
    ) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: [],
        data: [],
      });
    } else {
      const password_change = await this.adminAuthService.ChangePasswordForced(
        email_id
      );
      if (
        !password_change ||
        password_change === null ||
        password_change === undefined
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured During password sending",
          data: [],
        });
      } else {
        const result = await this.mailService.sendMail(
          "YOUR Password is",
          password_change,
          email_id
        );
        if (!result || result == null || result == undefined) {
          Logger.log("Error Sending mail", "");
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Error in sending mail",
            data: [],
          });
        } else {
          return res.status(200).json({
            code: "200",
            status: "success",
            message: "New Password Sent",
            data: [],
          });
        }
      }
    }
  }

  @Post("verifyadmin/tfa")
  async verifyTFA(@Res() res: any, @Body() body) {
    const { token, admin_id } = body;
    const admin_id_int = parseInt(admin_id);
    Logger.warn("Verifying Two Factor Auth ...");
    const admin = await this.adminAuthService.getAdminById(admin_id_int);
    if (!admin || admin === null || admin === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Admin not found",
        data: [],
      });
    } else {
      const isValid = await this.adminAuthService.VerifyTFA(
        admin_id_int,
        token
      );
      if (!isValid || isValid === null || isValid === undefined) {
        Logger.log("TFA not verified");
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "TFA not verified",
          data: [],
        });
      } else {
        Logger.log("TFA verified");
        admin.google_auth_code = admin.temp_secret.base32;
        await this.adminRepository.save(admin);
        const token = this.jwtService.sign(
          {
            admin_id: admin.admin_id,
          },
          { secret: `${process.env.ADMIN_JWT_SECRET}`, expiresIn: "1080h" }
        );

        return res.status(200).json({
          code: "200",
          status: "success",
          message: "TFA verified",
          data: {
            admin_id: admin.admin_id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            admin_email: admin.email_id,
            username: admin.username,
            token: token,
          },
        });
      }

      // try {
      //   const secret = admin.temp_secret.base32;

      //   const verified = speakeasy.totp.verify({
      //     secret,
      //     encoding: "base32",
      //     token,
      //   });

      //   if (verified) {
      //     Logger.log("TFA verified");
      //     admin.google_auth_code = admin.temp_secret.base32;
      //     await this.adminRepository.save(admin);
      //     const token = this.jwtService.sign(
      //       {
      //         admin_id: admin.admin_id,
      //       },
      //       { secret: `${process.env.ADMIN_JWT_SECRET}`, expiresIn: "1080h" }
      //     );

      //     return res.status(200).json({
      //       code: "200",
      //       status: "success",
      //       message: "TFA verified",
      //       data: {
      //         first_name: admin.first_name,
      //         last_name: admin.last_name,
      //         username: admin.username,
      //         token: token,
      //       },
      //     });
      //   } else {
      //     Logger.log("TFA not verified");
      //     return res.status(400).json({
      //       code: "400",
      //       status: "error",
      //       message: "TFA not verified",
      //       data: [],
      //     });
      //   }
      // } catch (e) {
      //   Logger.log(e, "AdminAuthController");
      //   return res.status(400).json({
      //     code: "400",
      //     status: "error",
      //     message: "Error Occured in Verify TFA",
      //     data: e,
      //   });
      // }
    }
  }

  @Post("check/email")
  async checkEmail(@Body() body, @Res() res: any) {
    const { email } = body;
    const result = await this.adminAuthService.checkEmail(email);
    if (!result || result === null || result === undefined) {
      Logger.log("Email not found", "AdminAuthController");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Email not found",
        data: null,
      });
    } else {
      Logger.log("Email found", "AdminAuthController");
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Email found",
        data: { admin_id: result.admin_id, email: result.email_id },
      });
    }
  }

  @Post("/update")
  @UsePipes(ValidationPipe)
  async UpdateAdminProfile(
    @Body() updateAdminDto: UpdateAdminDto,
    @Res() res: any
  ) {
    const user_email = await this.adminAuthService.checkEmail(
      updateAdminDto.email_id
    );
    if (!user_email || user_email === null || user_email === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Admin with Such Email not found",
        data: null,
      });
    }

    const result = await this.adminAuthService.UpdateAdminProfile(
      updateAdminDto
    );
    if (!result || result === null || result === undefined) {
      Logger.log("Profile update failed", "AdminAuthController");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, in  updating profile",
        data: null,
      });
    } else {
      Logger.log("Profile updated successfully", "AdminAuthController");
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Profile updated successfully",
        data: null,
      });
    }
  }

  @Post("/change/tfatoggle")
  async toggleTfaStatus(@Body() body, @Res() res: any) {
    const { admin_id, otp, isAuthStatus } = body;
    console.log(typeof isAuthStatus);
    console.log(body);
    const admin_id_int = parseInt(admin_id);
    const result = await this.adminAuthService.VerifyTFA(admin_id_int, otp);
    if (!result || result === null || result === undefined) {
      Logger.error("TFA not verified", "AdminAuthController");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "TFA  Status not changed",
        data: [],
      });
    } else {
      await this.adminAuthService.updateTFAStatus(admin_id_int, isAuthStatus);
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "TFA status updated successfully",
        data: [],
      });
    }
  }

  @Post("getdetails/admin/:id")
  async getAdminDetails(@Res() res: any, @Param("id") id: string) {
    Logger.log("Getting Admin Details", "AdminAuthController");
    const result = await this.adminAuthService.getAdminById(parseInt(id));
    if (!result || result === null || result === undefined) {
      Logger.log("Admin not found", "AdminAuthController");
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Admin not found",
        data: [],
      });
    } else {
      Logger.log("Admin found", "AdminAuthController");
      var otp_auth_url = result.temp_secret.otpauth_url;
      var otp_secret = result.temp_secret.base32;
      result.temp_secret = "";
      result.google_auth_code = "";
      var resultnew = {
        ...result,
        security_key: otp_secret,
        otp_auth_url: otp_auth_url,
      };

      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Admin found",
        data: resultnew,
      });
    }
  }

  @Post("login")
  async loginAdmin(@Body() body) {
    const { email_id, password } = body;
    const result = await this.adminAuthService.loginAdmin(email_id, password);
    if (!result || result === null || result === undefined) {
      Logger.log("Login failed", "AdminAuthController");
      return {
        code: "400",
        status: "error",
        message: "Error Occured in logging in",
        data: null,
      };
    } else {
      Logger.log("Logged in Succesfully", "AdminAuthController");
      const admin_ = await this.adminRepository.findOne({
        where: { email_id: email_id },
      });
      if (!admin_) {
        return {
          code: "400",
          status: "error",
          message: "Error Occured, no such email found",
          data: null,
        };
      }
      const token = this.jwtService.sign(
        {
          admin_id: admin_.admin_id,
        },
        { secret: `${process.env.ADMIN_JWT_SECRET}`, expiresIn: "1080h" }
      );
      Logger.log("Admin", admin_.email_id);
      return {
        code: "200",
        status: "success",
        message: "ADMIN JWT Token:",
        data: {
          token: token,
          admin_id: admin_.admin_id,
          admin_email: admin_.email_id,
          first_name: admin_.first_name,
          last_name: admin_.last_name,
          username: admin_.username,
          isGoogleAuthEnabled: admin_.google_auth_enabled,
        },
      };
    }
  }

  @Post("change/password")
  async changePassword(@Body() body) {
    const { email, old_password, new_password } = body;
    const result = await this.adminAuthService.changePassword(
      email,
      old_password,
      new_password
    );
    if (!result || result === null || result === undefined) {
      Logger.log("Password change failed", "AdminAuthController");
      return {
        code: "400",
        status: "error",
        message: "Error Occured, in changing password",
        data: null,
      };
    } else {
      Logger.log("Password changed successfully", "AdminAuthController");

      return {
        code: "200",
        status: "success",
        message: "Password changed successfully",
        data: null,
      };
    }
  }

  // @Post('logout')
  // async logout(@Body() body) {
  //   const { email_id } = body;
  //   const result = await this.adminAuthService.logout(email_id);
  //   if (!result || result === null || result === undefined) {
  //     return {
  //       code: "400",
  //       status: "error",
  //       message: "Error Occured",
  //       data: null,
  //     };
  //   } else {
  //     return {
  //       code: "200",
  //       status: "success",
  //       message: "Logged out successfully",
  //       data: null,
  //     };
  //   }
  // }
}
