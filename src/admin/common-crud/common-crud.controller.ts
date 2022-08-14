import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Response } from "express";
import { MailService } from "src/utils/mail/mail.service";
import { UpdateSettingsDto } from "../dtos/UpdateSetting.dto";
import { UpdateUserByAdminDto } from "../dtos/UpdateUserByAdminDto";
import { CommonCrudService } from "./common-crud.service";

@Controller("admin/common")
export class CommonCrudController {
  constructor(
    @Inject("MAIL_SERVICE") private readonly mailService: MailService,
    @Inject("CRUD_SERVICE")
    private readonly commonCrudService: CommonCrudService
  ) {}

  @Put("/getusernotifications/:userid")
  async getNotifications(
    @Res() res: Response,
    @Param("userid") userid: string
  ) {
    Logger.log("Get all notifications");
    const result = await this.commonCrudService.getNotifications(
      parseInt(userid)
    );
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        message: "No notifications found",
        code: "400",
        status: "error",
        data: null,
      });
    } else {
      return res.status(200).json({
        message: "Notifications found",
        code: "200",
        status: "success",
        data: result,
      });
    }
  }

  @Post("/getuserkycdetails")
  async getUserKycDetails(@Res() res: Response, @Body() body: any) {
    const { user_id } = body;
    const user_check = await this.commonCrudService.getUserDetailsById(user_id);
    var user_name =
      user_check.first_name.toUpperCase() +
      " " +
      user_check.last_name.toUpperCase();
    // const legal_name: string = user_check.legal_name
    //   ? " -- "
    //   : user_check.legal_name;
    // user_name = legal_name;
    const email = user_check.email_id;
    const document_type = user_check.document_type;
    const document_value = user_check.document_value;
    const country_id: number = user_check.country_id;
    var country: string = "";
    country_id == 1 ? (country = "USA") : (country = "INDIA");

    if (!user_check || user_check == undefined || user_check == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error, No suh user present",
        data: null,
      });
    }

    const user_kyc = await this.commonCrudService.getUserKycDetails(user_id);
    if (!user_kyc || user_kyc == undefined || user_kyc == null) {
      return res.status(201).json({
        code: "201",
        status: "error",
        message: "NO_KYC_FOUND",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "User kyc details found",
        data: {
          ...user_kyc,
          user_name,
          country,
          email,
          document_type,
          document_value,
        },
      });
    }
  }

  @Get("getusersips/:id")
  async getUserSips(@Res() res: Response, @Param("id") id: string) {
    const user_id = parseInt(id);
    const user = await this.commonCrudService.getUserSips(user_id);
    if (!user || user == null || user == undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error occured , No such user",
        data: null,
      });
    } else {
      //const user_sips = await this.usersService.getUserSips(user_id);
      //if (!user_sips || user_sips == null || user_sips == undefined) {
      //   return res.status(400).json({
      //     code: "400",
      //     status: "error",
      //     message: "Error occured , No Sips found",
      //     data: null,
      //   });
      // }
      //else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "User SIPs",
        data: user,
      });
    }
  }

  //Get all users:
  @Get("/allusers")
  async getAllUsers() {
    Logger.log("Get all users");
    const result = await this.commonCrudService.getAllUsers();
    if (!result || result === null || result === undefined) {
      return result;
    } else {
      //undefine password for each user:
      result.forEach((user) => {
        user.password = undefined;
        user.temp_secret
          ? (user.temp_secret.base32 =
              user.temp_secret.ascii =
              user.temp_secret.hex =
                undefined)
          : "";
      });
      return result;
    }
  }

  @Post("/gettingcount")
  async GetRepositoyEntriesCount2(@Res() res: Response) {
    Logger.log("Get all users");
    const result = await this.commonCrudService.getCountOfRepositoryEntries2();

    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting count of repository entries",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data found",
        data: result,
      });
    }
  }

  @Post("/getsipbytokencode")
  async getSIPByTokenCode(@Res() res: Response, @Body() body: any) {
    var { token_code, user_id } = body;
    token_code = "MFV-50";
    //Build a query to get sip details using sip and user id:

    const required_sip = await this.commonCrudService.getSipOfaUserByTokenCode(
      token_code,
      user_id
    );

    if (!required_sip || required_sip == undefined || required_sip == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No SIP found for given index token! ",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "SIP fetched for the user successfully",
        data: required_sip,
      });
    }
  }

  @Put("/update/user/:id")
  @UsePipes(ValidationPipe)
  async update(
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateUserByAdminDto: UpdateUserByAdminDto
  ) {
    var id_ = parseInt(id);
    const result = await this.commonCrudService.updateUserById(
      id_,
      updateUserByAdminDto
    );
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "User updated successfully",
        data: null,
      });
    }
  }

  @Post("/update/settings")
  async updateSettings(
    @Res() res: Response,
    @Body() updateSettingsDto: UpdateSettingsDto
  ) {
    const result = await this.commonCrudService.updateSettingsById(
      parseInt(updateSettingsDto.setting_id),
      updateSettingsDto
    );
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in updating settings",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Settings updated successfully",
        data: null,
      });
    }
  }

  @Get("/allenabledusers")
  async getEnabledUsers(@Res() res: Response) {
    const result = await this.commonCrudService.getEnabledUsers();
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting enabled users",
        data: 0,
      });
    } else {
      //undefine password for each user:
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Enabled Users Fetched Successfully",
        data: result,
      });
    }
  }

  // @Post("/getcitieslist")
  // async getCitiesList(@Res() res: Response) {
  //   const result = await this.commonCrudService.getCitiesList();
  //   if (!result || result === null || result === undefined) {
  //     return res.status(400).json({
  //       code: "400",
  //       status: "error",
  //       message: "Error Occured in getting cities list",
  //       data: [],
  //     });
  //   } else {
  //     return res.status(200).json({
  //       code: "200",
  //       status: "success",
  //       message: "Cities List Fetched Successfully",
  //       data: result,
  //     });
  //   }
  // }

  @Post("/getstateslist")
  async getStatesList(@Res() res: Response, @Body() body: any) {
    const states = await this.commonCrudService.getStateList();
    if (!states || states === null || states === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting states",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "States Fetched Successfully",
        data: states,
      });
    }
  }

  @Post("/getcountrylist")
  async getCountryList(@Res() res: Response) {
    const result = await this.commonCrudService.getCountryList();
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting country list",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Country List Fetched Successfully",
        data: result,
      });
    }
  }

  @Post("/changeuserdeletestatus")
  async changeUserDeleteStatus(@Res() res: Response, @Body() body: any) {
    const { user_id } = body;
    const user_check = await this.commonCrudService.getUserDetailsById(user_id);
    if (!user_check || user_check === null || user_check === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user found",
        data: [],
      });
    } else {
      const result = await this.commonCrudService.changeUserDeleteStatus(
        parseInt(user_id)
      );
      if (!result || result === null || result === undefined) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, No such user found",
          data: [],
        });
      } else {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "User Deleted Successfully",
          data: result,
        });
      }
    }
  }

  @Post("/changeuserstatus")
  async changeUserStatus(@Res() res: Response, @Body() body: any) {
    const { user_id } = body;
    const user_check = await this.commonCrudService.getUserDetailsById(user_id);
    if (!user_check || user_check == null || user_check == undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting user",
        data: [],
      });
    }

    const result = await this.commonCrudService.changeUserStatus(user_id);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in changing user status",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "User status changed successfully",
        data: null,
      });
    }
  }

  @Get("/alldisabledusers")
  async getDisabledUsers(@Res() res: Response) {
    const result = await this.commonCrudService.getDisabledUsers();
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting disabled users",
        data: null,
      });
    } else {
      //undefine password for each user:
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Disabled Users Fetched Successfully",
        data: result,
      });
    }
  }

  //Get All Records:
  @Get("/:repository")
  async getAllRecords(
    @Res() res: Response,
    @Param("repository") repository: string
  ) {
    Logger.log("Get all records");
    const result = await this.commonCrudService.getAll(repository);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting all records",
        data: null,
      });
    }
    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Data found successfully",
      data: result,
    });
  }

  //Get By Id:
  @Get(":repository/:id")
  async getAll(
    @Res() res: Response,
    @Param("repository") repository: string,
    @Param("id") id: string
  ) {
    var id_ = parseInt(id);
    const result = await this.commonCrudService.getById(id_, repository);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in getting all records of repository",
        data: null,
      });
    } else {
      result.created_datetime = result.created_ip = undefined;
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data found",
        data: result,
      });
    }
  }

  @Post(":repository/content")
  async getRepoContent(
    @Res() res: Response,
    @Param("repository") repository: string
  ) {
    const result = await this.commonCrudService.getRepoContent(repository);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data found",
        data: result,
      });
    }
  }

  //Toggle status:
  @Get("updateStatus/:repository/:id")
  async toggleStatus(
    @Res() res: Response,
    @Param("repository") repository: string,
    @Param("id") id: string
  ) {
    var id_ = parseInt(id);
    const result = await this.commonCrudService.updateStatus(id_, repository);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Status updated successfully",
        data: {},
      });
    }
  }

  @Post("/getcount/:repository")
  async GetRepositoyEntriesCount(
    @Res() res: Response,
    @Param("repository") repository: string
  ) {
    const result = await this.commonCrudService.getCountOfRepositoryEntries(
      repository
    );
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data found",
        data: result,
      });
    }
  }

  @Put("/addressdetails/:id")
  async getAddressDetails(@Res() res: Response, @Param("id") id: string) {
    var user_id = parseInt(id);
    const result = await this.commonCrudService.getAddressDetails(user_id);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data found",
        data: result,
      });
    }
  }

  @Put("/userdetails/:id")
  async getUserById(@Res() res: Response, @Param("id") id: string) {
    Logger.log("Get user by id");
    var id_ = parseInt(id);

    const result = await this.commonCrudService.getUserDetailsById(id_);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    } else {
      result.password = undefined;
      result.authauth_o_response = undefined;

      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data found",
        data: result,
      });
    }
  }

  @Delete(":repository/:id")
  async deleteSoft(
    @Res() res: Response,
    @Param("repository") repository: string,
    @Param("id") id: string
  ) {
    var id_ = parseInt(id);
    const result = await this.commonCrudService.deleteSoft(id_, repository);
    if (!result || result === null || result === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Data deleted successfully",
        data: {},
      });
    }
  }
}
