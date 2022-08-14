import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Request,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Request as RequestEx, Response } from "express";
import { FillSignUpFormDto } from "src/modules/dto/FillSignupForm.dto";
import { UpdateAddressDto } from "src/modules/dto/UpdateAddress.dto";
import { UpdatePhoneNumberDto } from "src/modules/dto/UpdatePhoneNumber.dto";
import { UpdateProfileDto } from "src/modules/dto/UpdateProfile.dto";
import { Repository } from "typeorm";
import { UserNotificationsService } from "../../../modules/controllers/user-noti-controller/user-notifications.service";
import { CreateUserDto } from "../../dto/Create-user.dto";
import { UpdateUserDto } from "../../dto/Update-user.dto";

import { PaytmChecksum } from "src/utils/PaytmCheckSum.ts/PaytmCheckSum";

import { MailService } from "src/utils/mail/mail.service";
import {
  moleculus_email_template as EmailEntity,
  moleculus_index_tokens as IndexTokensEntity,
} from "../../entities";
import { moleculus_sip_transactions as SIPTransactionsEntity } from "../../entities/siptransactions.entity";
import {
  document_Type_Enum,
  is_email_verified_Enum,
  is_phone_verified_Enum,
  moleculus_user as UserEntity,
} from "../../entities/user.entity";
import {
  kyc_status_enum,
  moleculus_user_kyc as KYCEntity,
} from "../../entities/userKYC.entity";
import { UsersService } from "./users.service";
import { AppDataSource } from "src/app.module";
const speakeasy = require("speakeasy");
require("dotenv").config({ debug: false });

@ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    @InjectRepository(IndexTokensEntity)
    private readonly indexTokenRepository: Repository<IndexTokensEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SIPTransactionsEntity)
    private readonly sipTransactionsRepository: Repository<SIPTransactionsEntity>,
    @InjectRepository(KYCEntity)
    private readonly kycRepository: Repository<KYCEntity>,
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>,
    @Inject("USER_SERVICE") private readonly usersService: UsersService,
    @Inject("MAIL_SERVICE") private readonly mailService: MailService,
    @Inject("NOTIFICATIONS_SERVICE")
    private readonly userNotificationsService: UserNotificationsService // private readonly usersService: UsersService
  ) {}

  @Post("/create-checkout-session")
  async test2(@Res() res: Response, @Body() body: any) {
    var stripeSecretKey: string =
      "sk_test_51LLfv8LMjeInNMeHeRkmwv2hdCr6r2z6YoJl3pOZBWvg7vlxBbQHjbKbNf8ZxLKFsvKMdsbOCsxnyyXb4Zk8gq5O00QG8yG6N3";
    // stripeSecretKey =
    //   "sk_test_51K5Es9SEil7NXEZmQ8bmsL26XMaZwmdOcHwf6wkSrP77sTYYzThAYOK9G0XqqLRHC6LR4pL57vZFDPML6peIAkZS003v85mNE4";
    const Stripe = require("stripe");
    const stripe = Stripe(stripeSecretKey);
    var { mentioned_currency, mentioned_amount } = body;
    mentioned_currency = mentioned_currency.toLowerCase();

    // var amount_mentioned = body.amount_mentioned * 100;
    try {
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ["card"],
        line_items: [
          {
            name: "Test",
            description: "Test",
            amount: mentioned_amount * 100,
            currency: mentioned_currency,
            quantity: 1,
          },
        ],
        mode: "payment",
        // automatic_payment_methods: ["card"],
        success_url: "http://localhost:3006/dashboard",
        cancel_url: "http://localhost:3006/",
      });
      console.log(session);
      return res.status(200).json({
        sessionId: session.id,
        url: session.url,
      });
    } catch (e) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: e,
      });
    }
  }

  @Post("/confirmpayment")
  async confirmpayment(@Res() res: Response) {
    const stripeSecretKey =
      "sk_test_51K5Es9SEil7NXEZmQ8bmsL26XMaZwmdOcHwf6wkSrP77sTYYzThAYOK9G0XqqLRHC6LR4pL57vZFDPML6peIAkZS003v85mNE4";
    const Stripe = require("stripe");
    const stripe = Stripe(stripeSecretKey);

    const paymentIntent = await stripe.paymentIntents.confirm(
      "pi_3LPPJMSEil7NXEZm1FpCgjww",
      { payment_method: "pm_card_visa" }
    );

    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Payment Successful",
      data: paymentIntent,
    });
  }

  @Post("/paytmsignaturegeneration")
  async paytmSignatureGeneration(@Res() res: Response, @Body() req_body: any) {
    var body_ = req_body.body;

    var signature_ = await PaytmChecksum.generateSignature(
      JSON.stringify(body_),
      "GPmd3eUbWb6QUJ22"
    );
    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Paytm Signature Generated",
      data: signature_,
    });
  }

  @Post("/testuserquery")
  async testUserQuery(@Res() res: Response) {
    var time_st = `${new Date().getTime()}`;
    const paytm_host = "https://securegw-stage.paytm.in/";

    var time_st = `${new Date().getTime()}`;
    const paytm_url = `${paytm_host}/subscription/create?mid=WQYSrm75379129120709&orderId=PYTM_ORDR_${time_st}`;
    const merchant_key = "GPmd3eUbWb6QUJ22";
    const paytm_body = {
      requestType: "NATIVE_SUBSCRIPTION",
      mid: "WQYSrm75379129120709",
      websiteName: "WEBSTAGING",
      orderId: `PYTM_ORDR_${time_st}`,
      subscriptionAmountType: "FIX",
      subscriptionEnableRetry: "1",
      subscriptionFrequency: "1",
      subscriptionFrequencyUnit: "DAY",
      subscriptionExpiryDate: "2023-12-31",
      txnAmount: {
        value: "1.00",
        currency: "INR",
      },
      userInfo: {
        custId: "CUST_001",
        email: "rishabh210798@gmail.com",
      },
    };

    var signature_ = await PaytmChecksum.generateSignature(
      JSON.stringify(paytm_body),
      merchant_key
    );
    console.log(await signature_);
    const paytm_head = { signature: signature_ };
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    };

    const res_paytm = await axios({
      method: "post",
      url: paytm_url,
      headers: headers,
      data: {
        body: paytm_body,
        head: paytm_head,
      },
    });

    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Create Subscription - Paytm Response ",
      data: res_paytm.data,
    });
  }

  @Post("/getsipbytokencode")
  async getSIPByTokenCode(@Res() res: Response, @Body() body: any) {
    const { token_code, user_id } = body;
    //Build a query to get sip details using sip and user id:
    const required_sip = await this.sipTransactionsRepository.find({
      where: { token_code: token_code, tra_user_id: user_id },
    });

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

  @Post("/kyc/status")
  async getKycDetails(@Request() req: RequestEx, @Res() res: Response) {
    const user_id = parseInt(req.body.user_id);
    const user_ = await this.usersService.findOne(user_id);
    if (!user_) {
      return res.status(400).json({
        conde: "400",
        status: "error",
        message: "User not found",
        data: null,
      });
    }

    const kyc = await this.kycRepository.findOne({
      where: {
        kyc_user_id: user_.user_id,
      },
      order: { kyc_id: "DESC" },
    });

    if (kyc === null || kyc === undefined) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "KYC not done",
        data: [],
      });
    }
    if (kyc.kyc_status === kyc_status_enum.Pending) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "KYC Pending",
        data: {
          isKYCDone: false,
          isKYCPending: true,
        },
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "KYC done for the user",
        data: { isKYCDone: true, KYCDetails: kyc },
      });
    }
  }

  @Post("/details")
  async getUserDetails(@Request() req: RequestEx, @Res() res: Response) {
    const user_id = parseInt(req.body.user_id);
    const user_ = await this.usersService.findOne(user_id);
    if (!user_) {
      return res.status(400).json({
        conde: "400",
        status: "error",
        message: "User not found",
        data: null,
      });
    }
    user_.password = undefined;
    if (user_.temp_secret) {
      user_.temp_secret.hex =
        user_.temp_secret.ascii =
        user_.temp_secret.base32 =
          undefined;
    }
    user_.auth_o_response = user_.auth_o_response_decrypted;
    user_.auth_o_response_decrypted = undefined;
    var verified_on: string = "";
    const kyc_details = await this.kycRepository.findOne({
      where: { kyc_user_id: user_.user_id },
      order: { kyc_id: "DESC" },
    });
    if (kyc_details && kyc_details.kyc_status === kyc_status_enum.Completed) {
      verified_on = `87`;
    }

    res.status(200).json({
      code: "200",
      status: "success",
      message: "User fetched successfully",
      data: { ...user_, verified_on: verified_on ? verified_on : null },
    });
  }

  @Post("/getallindextokens")
  async getIndexTokens(@Res() res: Response) {
    const indexTokens = await this.indexTokenRepository.find({
      order: { token_code: "ASC" },
    });

    if (!indexTokens || indexTokens == null || indexTokens === undefined) {
      return res.status(400).json({
        conde: "400",
        status: "error",
        message: "Index tokens not found",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Index tokens fetched successfully",
        data: indexTokens,
      });
    }
  }

  @Get("/getallindextokensuser")
  async getIndexTokensuser(@Res() res: Response) {
    const indexTokens = await this.indexTokenRepository.find({
      order: { token_code: "ASC" },
    });

    if (!indexTokens || indexTokens == null || indexTokens === undefined) {
      return res.status(400).json({
        conde: "400",
        status: "error",
        message: "Index tokens not found",
        data: [],
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Index tokens fetched successfully",
        data: indexTokens,
      });
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post("register")
  @UsePipes(ValidationPipe)
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ) {
    try {
      const user_check_email = await this.usersService.findUserByEmail(
        createUserDto.email_id
      );
      const user_check_phone = await this.usersService.findPhoneNumber(
        createUserDto.phone_number
      );
      if (user_check_email || user_check_phone) {
        return res.status(400).json({
          code: "400",
          status: "Error",
          message: "Error Occured User with such phone / email already exists",
          data: [],
        });
      }
      const user_ = await this.usersService.registerUser(createUserDto);
      const temp_secret = await speakeasy.generateSecret();
      if (user_) {
        const adress_confirmation = await this.usersService.createAddress(
          user_.user_id
        );
        if (adress_confirmation == null || adress_confirmation == undefined) {
          Logger.error("New Address not created, Address for the user exists");
        }

        user_.temp_secret = temp_secret;
        user_.google_auth_code = temp_secret.base32;

        const noti = await this.userNotificationsService.createNotification(
          user_.user_id
        );
        if (noti == null || noti == undefined) {
          Logger.error(
            " User Id already exists in the Users Notification table"
          );
        }

        await this.userRepository.save(user_);
        user_.temp_secret.hex = undefined;
        user_.temp_secret.ascii = undefined;
        user_.temp_secret.base32 = undefined;
        user_.password = undefined;
        Logger.log("User created Succesfully");
        if (adress_confirmation) {
          Logger.log("Address created Succesfully");
        }
        if (noti) {
          Logger.log("User Notifications Created Succesfully");
        }
        return res.status(201).json({
          code: "200",
          status: "success",
          message: "User has been created successfully",
          data: null,
        });
      } else {
        Logger.log("User not created!");
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured",
          data: null,
        });
      }
    } catch (e) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: e,
      });
    }
  }

  @Post("/getstates")
  async getStates(@Res() res: Response, @Body() body: any) {
    if (
      body.country === "USA" ||
      body.country === "US" ||
      body.country === "United States" ||
      body.country === "Usa" ||
      body.country === "usa"
    ) {
      const countries = await this.usersService.getStatesUSA();
      if (countries) {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "States fetched successfully",
          data: countries,
        });
      } else if (countries === null || countries === undefined) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured while fetching states",
          data: [],
        });
      }
    } else if (
      body.countrty === "India" ||
      body.country === "INDIA" ||
      body.country === "india"
    ) {
      const countries = await this.usersService.getStatesINDIA();
      if (countries) {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "States fetched successfully",
          data: countries,
        });
      } else if (countries === null || countries === undefined) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured",
          data: [],
        });
      }
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured in fetching states",
        data: [],
      });
    }
  }

  @Post("/getcountries")
  async getCountries(@Res() res: Response) {
    const countries = await this.usersService.getCountries();
    if (countries) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Countries fetched successfully",
        data: countries,
      });
    } else if (countries === null || countries === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: [],
      });
    }
  }

  @Post("sendotp")
  async sendOTP(@Res() res: Response, @Body() body) {
    const { email_id, phone_number } = body;
    const results = {
      is_sms_sent: false,
      sms_info: null,
      is_email_sent: false,
      email_info: null,
    };
    try {
      const user__ = await this.usersService.findUserByEmail(email_id);

      if (user__) {
        //if phone number is present
        if (phone_number) {
          user__.otp = "123456";
          await this.userRepository.save(user__);
          results.is_sms_sent = true;
          results.sms_info = "SMS otp sent";
        }

        //else if email_id is present:
        if (email_id) {
          user__.otp = "123456";
          await this.userRepository.save(user__);

          results.is_email_sent = true;
          results.email_info = "email otp sent";
        }
        if (
          (!email_id && !phone_number) ||
          (email_id === undefined && phone_number === undefined) ||
          (email_id === null && phone_number === null)
        ) {
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Error Occured, neither phone not email Provided! ",
            data: null,
          });
        }
        if (results.is_sms_sent || results.is_email_sent) {
          return res.status(200).json({
            code: "200",
            status: "success",
            message: "OTP Sending details as follows:",
            data: results,
          });
        } else {
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Some Unknown Error Occured",
            data: null,
          });
        }
      } else {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Unknown Error Occured",
          data: null,
        });
      }
    } catch (e) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Server error , try later ",
        data: e,
      });
    }
  }

  @Post("resendotp")
  async resendOTP(@Res() res: Response, @Body() body) {
    let user_;
    const results = {
      is_sms_sent: false,
      sms_info: null,
      is_email_sent: false,
      email_info: null,
    };
    const { email_id, phone_number } = body;
    if (
      (!email_id && !phone_number) ||
      (email_id == null && phone_number == null) ||
      (email_id == undefined && phone_number == undefined) ||
      (email_id == "" && phone_number == "") ||
      (email_id == null && phone_number == undefined) ||
      (email_id == undefined && phone_number == null) ||
      (email_id == "" && phone_number == undefined)
    ) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No email and phone number",
        data: null,
      });
    }
    if (email_id) {
      user_ = await this.usersService.findUserByEmail(email_id);
    }
    if (phone_number) {
      user_ = await this.usersService.findPhoneNumber(phone_number);
    }

    if (!user_ || user_ == undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error occured , No such user",
        data: null,
      });
    }
    try {
      if (phone_number) {
        user_.otp = "123456";
        user_.otp_creation_time = null;
        await this.userRepository.save(user_);
        results.is_sms_sent = true;
        results.sms_info = "sms otp sent";
      }
      if (email_id) {
        user_.otp = "123456";
        user_.otp_creation_time = null;
        await this.userRepository.save(user_);
        results.is_email_sent = true;
        results.email_info = "Email otp sent !";
      }
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "OTP Sending details as follows:",
        data: results,
      });
    } catch (e) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: " Error occured",
        data: e,
      });
    }
  }

  //Soft deleting the Account:
  @Post("delete/account")
  async softDeleteAccount(@Res() res: Response, @Body() body) {
    const user_id = parseInt(body.user_id);
    const check_account = await this.usersService.findOne(user_id);
    if (!check_account || check_account == undefined || check_account == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    const result = await this.usersService.deleteAccount(user_id);
    if (result) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Account has been deleted successfully",
        data: result,
      });
    }
  }

  @Post("update/userkycdetails")
  async updateKYCDetails(@Res() res: Response, @Body() body) {
    const { user_id, token, vendor_id, isAgain, api_response } = body;

    const user_ = await this.usersService.findOne(user_id);
    if (!user_ || user_ == undefined || user_ == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user",
        data: null,
      });
    } else {
      const kyc = await this.usersService.updateKYCDetails(
        user_id,
        token,
        vendor_id,
        parseInt(isAgain),
        api_response
      );
      if (!kyc || kyc == undefined || kyc == null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, No KYC Rcord Found",
          data: null,
        });
      } else {
        console.log("KYC:", kyc);
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "KYC details updated successfully",
          data: kyc,
        });
      }
    }
  }

  @Post("/sendkycresponse")
  async sendKYCResponse(@Res() res: Response, @Body() sendKYCResponse) {
    const { user_id, token, kyc_response } = sendKYCResponse;
    const user_ = await this.usersService.findOne(user_id);
    if (!user_ || user_ == undefined || user_ == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user",
        data: [],
      });
    } else {
      const kyc_result = await this.usersService.sendKYCResponse(
        user_id,
        token,
        kyc_response
      );
      if (!kyc_result || kyc_result == undefined || kyc_result == null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured in saving the KYC Response",
          data: null,
        });
      } else {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "KYC details sent successfully",
          data: kyc_result,
        });
      }
    }
  }

  @Post("userkycdetails")
  async getUserKYCDetails(@Res() res: Response, @Body() body) {
    const { user_id } = body;
    const user_ = await this.usersService.findOne(user_id);

    if (!user_ || user_ == undefined || user_ == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured , No such user",
        data: null,
      });
    } else {
      const kyc_result = await this.usersService.getUserKYCDetails(user_id);
      if (!kyc_result || kyc_result == undefined || kyc_result == null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Database Error Occured in Getting Kyc Details, try later",
          data: null,
        });
      } else {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "KYC Details: ",
          data: kyc_result,
        });
      }
    }
  }

  @Post("verify/otp")
  async verifyOTP(@Res() res: Response, @Body() body: any) {
    const given_otp = body.otp;
    const email_id = body.email_id;
    const phone_number = body.phone_number;
    let user: any;
    let type: any;

    if (email_id) {
      user = await this.usersService.findUserByEmail(email_id);
      type = "email";
    } else if (phone_number) {
      user = await this.usersService.findPhoneNumber(phone_number);
      type = "phone";
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, neither email nor phon Number",
        data: null,
      });
    }
    if (!user || user == undefined || user.otp == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user exists",
        data: null,
      });
    }
    const result = await this.usersService.verifyOTP(email_id, given_otp);
    if (result) {
      if (type == "phone") {
        user.is_phone_verify = is_phone_verified_Enum.Yes;
      } else if (type == "email") {
        user.is_email_verify = is_email_verified_Enum.Yes;
      }
      await this.userRepository.save(user);
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "OTP verified Succesfully ",
        data: { user_id: user.user_id, user_email: user.email_id },
      });
    } else if (result == false) {
      return res.status(401).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
  }

  @Post("verify/tfa")
  async verifyTFA(@Res() res: Response, @Body() body) {
    const results = {
      isVerified: false,
      statusCode: null,
    };
    const { token, user_id } = body;
    try {
      const user = await this.usersService.findOne(parseInt(user_id));
      const secret = user.temp_secret.base32;
      const verified = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
      });

      if (verified) {
        Logger.log("TFA verified");
        user.google_auth_code = user.temp_secret.base32;
        await this.userRepository.save(user);
        results.isVerified = true;
        results.statusCode = 200;
        user.temp_secret = null;

        return res.status(200).json({
          code: "200",
          status: "success",
          message: "TFA verified Succesfully ",
          data: { user_id: user.user_id, ...user },
        });
      } else {
        Logger.error("TFA NOT verified");
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "TFA NOT verified",
          data: [],
        });
      }
    } catch (error) {
      Logger.log(error);
      return res.status(400).json({
        code: "400",
        status: "error",
        message: " Error occured in verifying TFA",
        data: error,
      });
    }
  }

  @Post("verify/email/change")
  async verifyEmailChange(@Res() res: Response, @Body() body) {
    const { new_email_id, otp, user_id } = body;
    const user = await this.usersService.findOne(parseInt(user_id));
    if (!user || user == undefined || user.otp == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    const result = await this.usersService.verifyNewEmailOTP(
      user_id,
      otp,
      new_email_id
    );

    if (result) {
      Logger.log("OTP for new Email verified");
      user.email_id = new_email_id;
      user.is_email_verify = is_email_verified_Enum.Yes;
      await this.userRepository.save(user);
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Email verified successfully!",
        data: { user_id: user.user_id, user_email: user.email_id },
      });
    } else {
      user.temp_email_id = null;
      await this.userRepository.save(user);
      return res.status(401).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post("notifications")
  async getNotification(@Res() res: Response, @Body() body) {
    const { user_id } = body;
    const user = await this.usersService.findOne(parseInt(user_id));
    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user exists",
        data: null,
      });
    }
    const notification = await this.userNotificationsService.getNotification(
      parseInt(user_id)
    );

    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Notification fetched successfully!",
      data: notification,
    });
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Post("/updateprofile")
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Res() res: Response,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    const { user_id } = updateProfileDto;
    if (
      updateProfileDto.ssn != null &&
      updateProfileDto.ssn != undefined &&
      updateProfileDto.ssn != ""
    ) {
      if (updateProfileDto.ssn.length != 9) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "SSN should be 9 digits",
          data: null,
        });
      }
    }

    const user = await this.usersService.findOne(parseInt(user_id));
    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    const result = await this.usersService.updateProfile(
      parseInt(user_id),
      updateProfileDto
    );
    if (result) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Profile updated successfully!",
        data: result,
      });
    } else {
      return res.status(401).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
  }

  async checkDocument(
    document_type_: string,
    document_value: string,
    user_id: number
  ) {
    var document_type = document_type_.toLowerCase();

    var aadhaar_check: boolean,
      pan_check: boolean,
      ssn_check: boolean,
      tin_check: boolean = false;

    if (document_type == "aadhaar" || document_type == "aadhar") {
      aadhaar_check = await this.usersService.checkDocument(
        "AADHAR",
        document_value,
        user_id
      );
    }
    if (document_type == "pan") {
      pan_check = await this.usersService.checkDocument(
        "PAN",
        document_value,
        user_id
      );
    }
    if (document_type == "ssn") {
      ssn_check = await this.usersService.checkDocument(
        "SSN",
        document_value,
        user_id
      );
    }
    if (document_type == "tin") {
      tin_check = await this.usersService.checkDocument(
        "TIN",
        document_value,
        user_id
      );
    }
    if (aadhaar_check || pan_check || ssn_check || tin_check) {
      return true;
    }
  }

  @Post("/update/personalinfo")
  @UsePipes(ValidationPipe)
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const user_id = parseInt(updateUserDto.user_id);
    const user_check = await this.usersService.findOne(user_id);

    if (!user_check) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured , No such user exists",
        data: null,
      });
    }

    const isPhoneTaken = await this.usersService.findPhoneNumber(
      updateUserDto.phone_number
    );

    if (isPhoneTaken) {
      if (isPhoneTaken.user_id != user_id) {
        console.log("isPhone_userid : ", isPhoneTaken.user_id);
        console.log("user_id: ", user_id);
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured , Phone number already taken",
          data: null,
        });
      }
    }

    var is_document_exist = await this.checkDocument(
      updateUserDto.document_type,
      updateUserDto.document_value,
      user_id
    );
    if (is_document_exist) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "The Given Document already exists for another User",
        data: null,
      });
    }

    const user_email = user_check.email_id;

    if (
      updateUserDto.document_type == "PAN" ||
      updateUserDto.document_type == "pan"
    ) {
      const is_new_document_valid_pan =
        await this.usersService.checkPanValidity(
          updateUserDto.document_value,
          user_email,
          updateUserDto.full_legal_name
        );
      if (is_new_document_valid_pan == null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message:
            " UIDAI error, Unable to check authenticity of PAN, Personal Information NOT updated",
          data: null,
        });
      }
      if (is_new_document_valid_pan == false) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: " Invalid PAN Entered, Personal Information NOT updated",
          data: null,
        });
      }
    }

    if (
      updateUserDto.document_type == "AADHAAR" ||
      updateUserDto.document_type == "AADHAR" ||
      updateUserDto.document_type == "aadhaar" ||
      updateUserDto.document_type == "aadhar"
    ) {
      const is_new_document_valid_aadhaar =
        await this.usersService.checkAadhaarValidity(
          updateUserDto.document_value,
          user_email
        );
      if (is_new_document_valid_aadhaar == null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message:
            " UIDAI error, Unable to check authenticity of AADHAAR entered ",
          data: null,
        });
      }
      if (is_new_document_valid_aadhaar == false) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Invalid AADHAAR Entered, Personal Information NOT updated",
          data: null,
        });
      }
    }

    const user_ = await this.usersService.updateUser(updateUserDto, user_id);
    if (user_) {
      user_.password = undefined;
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Personal Information updated successfully! ",
        data: null,
      });
    } else if (!user_ || user_ == undefined || user_ === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, cannot update user personal info ",
        data: null,
      });
    }
  }

  @Post("/verifyuserpan")
  async verifyUserDocument(@Res() res: Response, @Body() body) {
    const { user_id, pan } = body;
    var document_value = pan;
    var document_type = "PAN";
    const user = await this.usersService.findOne(parseInt(user_id));
    if (
      document_value == "" ||
      document_value == null ||
      document_value.length != 10
    ) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "PAN should be 10 digits",
        data: null,
      });
    }
    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user ",
        data: null,
      });
    } else {
      var legal_name = user.legalname.toUpperCase();
      var user_email = user.email_id;

      const verif_res = await this.usersService.verifyUserDocumentPAN(
        legal_name,
        user_email,
        document_type,
        document_value
      );

      if (!verif_res || verif_res == undefined || verif_res === null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Unable to get response from Income tax database",
          data: null,
        });
      }

      if (verif_res.response_status.code === "333") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Invalid PAN entered, No Data Found",
          data: null,
        });
      }

      if (
        verif_res.verification_code === "400103" ||
        verif_res.verification_code === "410005"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Given PAN is not valid",
          data: null,
        });
      }
      if (
        verif_res.verification_code === "410007" ||
        verif_res.verification_code === "400099"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "PAN Verification from UIDAI Service Not Available",
          data: null,
        });
      }
      if (
        verif_res.verification_code === "000" &&
        verif_res.verification_status === "SUCCESS"
      ) {
        var full_name_pan: string = verif_res.full_name;
        const name_string = verif_res.verified_data;
        const a = name_string.split('name":')[1].split(",")[0];
        var len = a.length;
        console.log("Our DATABASE:", legal_name);
        const name_verfied: string = a.substring(1, len - 1);
        console.log("PAN DATABASE:", name_verfied);

        if (name_verfied == legal_name || legal_name == full_name_pan) {
          Logger.log("PAN Verified Successfully");
          var user_kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
          });
          if (!user_kyc || user_kyc == null || user_kyc == undefined) {
            const new_kyc = await this.kycRepository.create({
              kyc_user_id: user_id,
            });
            const req_data = await axios
              .get("https://ipinfo.io")
              .then((res) => res.data)
              .catch(() => {
                req_data: "";
              });
            new_kyc.kyc_status = kyc_status_enum.Completed;
            new_kyc.api_repsonse = JSON.stringify(verif_res);
            new_kyc.token = verif_res.txn_id;
            //new_kyc.created_datetime = new Date();

            new_kyc.created_ip = req_data.ip ? req_data.ip : " ";
            new_kyc.acknowledgement_number = `${Math.random()
              .toString(36)
              .substring(12, 20)}`;
            await this.kycRepository.save(new_kyc);
          } else {
            user_kyc.api_repsonse = JSON.stringify(verif_res);
            user_kyc.token = verif_res.txn_id;
            user_kyc.acknowledgement_number = `${Math.random()
              .toString(36)
              .substring(2, 10)}`;
            user_kyc.kyc_status = kyc_status_enum.Completed;
            //user_kyc.created_datetime = new Date();
            user_kyc.created_ip = "";
            await this.kycRepository.save(user_kyc);
          }

          const user_info_update = await this.userRepository.findOne({
            where: { user_id: user_id },
          });

          if (user_info_update) {
            user_info_update.document_type = document_Type_Enum.PAN;
            user_info_update.document_value = document_value;
            await this.userRepository.save(user_info_update);
          }

          //Send email comfirmation to user:
          var email_subject: string, email_body: string;
          const email_format = await this.emailRepository.findOne({
            where: { email_keyword: "KYCSUCCESSFUL" },
          });
          var user_first_name = user_info_update.first_name;

          if (email_format) {
            email_subject = email_format.subject.concat(": PAN");
            email_body = email_format.description
              .toString()
              .replace(/first name/g, `${user_first_name}`)
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/\{/g, "")
              .replace(/\}/g, "")
              .replace(
                /url_customer_support/g,
                "https://www.moleculus.network/"
              );
          }
          var e_res = await this.mailService
            .sendMail(email_subject, email_body, user.email_id)
            .then((res) => {
              console.log("Email sent successfully ", res);
              Logger.log("Email sent successfully", "verifyuserpan");
            })
            .catch((err) => {
              console.log("Error in sending email", err);
            });
          console.log("Email sent successfully ", e_res);

          return res.status(200).json({
            code: "200",
            status: "success",
            message: "Document Verified Successfully!",
            data: null,
          });
        }
        if (name_verfied !== legal_name) {
          Logger.log("PAN Verification Failed, Name Mismatch");

          var user_ = await this.userRepository.findOne({
            where: { user_id: user_id },
          });
          user_.isPersonalFilled = 0;
          user_.isAddressFilled = 0;
          user.legalname = null;
          user.dob = null;
          user.document_type = document_Type_Enum.PAN;
          user.phone_number = null;
          user_.document_value = null;
          await this.userRepository.save(user_);

          var user_kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
          });

          if (user_kyc) {
            user_kyc.kyc_status = kyc_status_enum.Rejected;
            // user_kyc.api_repsonse = `Rejected at ${new Date().toLocaleString()}`;
            await this.kycRepository.save(user_kyc);
          }

          user_.isPersonalFilled = 0;
          user_.isAddressFilled = 0;
          user.legalname = null;
          user.dob = null;
          user.document_type = document_Type_Enum.PAN;
          user.phone_number = null;
          user_.document_value = null;
          await this.userRepository.save(user_);
          return res.status(400).json({
            code: "400",
            status: "error",
            message:
              "Document Verification Failed, The Income Tax Database has different data for the given PAN",
            data: null,
          });
        }
      }
    }
    return res.status(400).json({
      code: "400",
      status: "error",
      message: "Unable to get response from Income tax database",
      data: null,
    });
  }

  //getCaptcha for aadhaar verification:
  @Post("/getcaptcha")
  async getCaptcha(@Res() res: Response, @Body() body) {
    Logger.log("Inside getCaptcha", "getCaptcha");
    const { user_id } = body;
    const user = await this.usersService.findOne(parseInt(user_id));

    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user exists",
        data: null,
      });
    } else {
      Logger.log("Inside getCaptcha:userController", "getCaptcha");
      const user_email = user.email_id;
      const captcha_res = await this.usersService.getCaptcha(
        user_email
        // request_id
      );
      //console.log("captcha_res: ", captcha_res);
      if (!captcha_res) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, unable to contact to server",
          data: null,
        });
      }

      if (
        captcha_res.response_status.code === "000" &&
        captcha_res.response_data.captcha.length > 0
      ) {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "Captcha fetched successfully!",
          data: {
            uuid: captcha_res.response_data.uuid,
            captcha: captcha_res.response_data.captcha,
          },
        });
      }
      if (
        captcha_res.response_status.code === "000" &&
        captcha_res.response_data.captcha.length == 0
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Captcha fetching Failed! UIDAI Server Error",
          data: [],
        });
      }
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "UIDAI Server Error   ",
        data: [],
      });
    }
  }

  @Post("/enteraadhaar")
  async enterAadhaar(@Res() res: Response, @Body() body) {
    const { uuid, aadhaar, captcha, user_id } = body;
    const request_id = `requestId${Math.floor(Math.random() * 10000)}`;
    const user = await this.usersService.findOne(parseInt(user_id));
    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user exists",
        data: null,
      });
    } else {
      Logger.log("Inside enterAadhaar: userController", "enterAadhaar");
      const user_email: string = user.email_id;
      if (aadhaar.length != 12) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Aadhaar Number is not valid",
          data: null,
        });
      }
      if (
        captcha == "" ||
        captcha == undefined ||
        captcha == null ||
        !captcha
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Captcha is required",
          data: null,
        });
      }

      if (uuid == "" || uuid == undefined || uuid == null || !uuid) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "UUID is required",
          data: null,
        });
      }

      const aadhaar_res = await this.usersService.enterAadhaar(
        uuid,
        aadhaar,
        captcha,
        request_id,
        user_email
      );

      if (
        !aadhaar_res ||
        aadhaar_res == undefined ||
        aadhaar_res === null ||
        aadhaar_res.response_status == null
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, unable to contact to server",
          data: null,
        });
      }

      if (aadhaar_res.response_status.code === "000") {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "OTP sent to your Registered Mobile number!",
          data: [],
        });
      }

      if (aadhaar_res.response_status.code === "470049") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "UUID is required",
          data: null,
        });
      }

      if (
        aadhaar_res.response_status.code === "470043" ||
        aadhaar_res.response_status.code === "470051"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Captcha is invalid",
          data: null,
        });
      }

      if (aadhaar_res.response_status.code === "470081") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "UUID Invalid or Session Does not exist",
          data: null,
        });
      }

      if (aadhaar_res.response_status.code === "470043") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Aadhaar is invalid",
          data: null,
        });
      }

      if (aadhaar_res.response_status.code === "333") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "UIDAI Error, try later",
          data: null,
        });
      }

      if (
        aadhaar_res.response_status.code === "470171" ||
        aadhaar_res.response_status.code === "470172" ||
        aadhaar_res.response_status.code === "470046"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message:
            "Cannot be processed from UIDAI server, Please try after Sometime",
          data: null,
        });
      }

      if (
        aadhaar_res.response_status.code === "470046" ||
        aadhaar_res.response_status.code === "470047" ||
        aadhaar_res.response_status.code === "470167" ||
        aadhaar_res.response_status.code === "470168"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Aadhaar Number is not valid",
          data: null,
        });
      }

      if (aadhaar_res.response_status.code === "470048") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Session Expired, try again",
          data: null,
        });
      }
      if (aadhaar_res.response_status.code === "470165") {
        return res.status(403).json({
          code: "403",
          status: "error",
          message: "Incorrect Captcha",
          data: [],
        });
      }

      if (
        aadhaar_res.response_status.code === "000" &&
        aadhaar_res.response_data.message == null
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "OTP sending Failed! UIDAI Server Error",
          data: [],
        });
      }
      if (aadhaar_res.response_status.code !== "000") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message:
            "Some Unknown Error Occured in sending OTP, Please restart the process ",
          data: [],
        });
      }
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Some Error Occured From UIDAI server, try again",
        data: [],
      });
    }
  }

  //enterAadhaar OTP:
  @Post("/enterotp")
  async enterOtp(@Res() res: Response, @Body() body) {
    var { uuid, otp, request_id, user_id } = body;
    request_id = `requestId${new Date().getTime().toString().substring(8, 13)}`;
    const user = await this.usersService.findOne(parseInt(user_id));
    if (otp.length != 6 || otp == undefined || otp == null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "OTP is not valid",
        data: null,
      });
    }
    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user exists",
        data: null,
      });
    } else {
      Logger.log("Inside enterOtp: userController", "enterOtp");
      const user_email: string = user.email_id;

      const otp_res = await this.usersService.enterOtp(
        uuid,
        otp,
        request_id,
        user_email
      );
      //console.log("otp_res: ", otp_res);

      if (!otp_res || otp_res == undefined || otp_res === null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, unable to contact to server",
          data: null,
        });
      }
      if (
        otp_res.response_status.code === "470170" ||
        otp_res.response_status.code === "470168"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "No mobile number is linked with this Aadhaar Number",
          data: null,
        });
      }

      if (
        otp_res.response_status.code === "470066" ||
        otp_res.response_status.code === "470052"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Server Error occured during API call to UIDAI, try again",
          data: null,
        });
      }

      if (otp_res.response_status.code === "470084") {
        return res.status(403).json({
          code: "403",
          status: "error",
          message: "OTP Invalid, try again",
          data: null,
        });
      }

      if (
        otp_res.response_status.code === "470048" ||
        otp_res.response_status.code === "470169"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "The Session has expired, try again",
          data: null,
        });
      }

      //invalid otp entered:
      if (
        otp_res.response_status.code === "470021" ||
        otp_res.response_status.code === "470022" ||
        otp_res.response_status.code === "470023" ||
        otp_res.response_status.code === "470024"
      ) {
        return res.status(403).json({
          code: "403",
          status: "error",
          message: `OTP Invalid  ${otp_res.response_status.message}`,
          data: [],
        });
      }

      if (otp_res.response_status.code === "000") {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "KYC Details fetched successfully",
          data: null,
        });
      }
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Some Server Error from UIDAI ",
        data: null,
      });
    }
  }

  @Post("/fetchkyc")
  async fetchKyc(@Res() res: Response, @Body() body) {
    const { user_id, uuid, aadhaar } = body;
    const user = await this.usersService.findOne(parseInt(user_id));

    if (!uuid || uuid == undefined || uuid == null || uuid.length < 20) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "UUID is not valid",
        data: null,
      });
    }

    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user exists",
        data: null,
      });
    } else {
      Logger.log("Inside fetchKyc: userController", "fetchKyc");

      const user_email: string = user.email_id;
      const kyc_res = await this.usersService.fetchKyc(uuid, user_email);
      //console.log("kyc_res: ", kyc_res);

      if (!kyc_res || kyc_res == undefined || kyc_res === null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, unable to contact to server",
          data: null,
        });
      }

      if (
        kyc_res.response_status.code === "470028" ||
        kyc_res.response_status.code === "470042"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Server Error occured during API call to UIDAI, try again",
          data: null,
        });
      }

      if (
        kyc_res.response_status.code === "470156" ||
        kyc_res.response_status.code === "470030"
      ) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Invalid UUID ",
          data: null,
        });
      }

      if (kyc_res.response_status.code === "470032") {
        return res.status(403).json({
          code: "403",
          status: "error",
          message: "OKYC Data does not exist",
          data: null,
        });
      }
      if (
        kyc_res.response_status.code == "000" &&
        kyc_res.response_data !== null
      ) {
        const given_legalname = user.legalname.toUpperCase();
        const name = kyc_res.response_data.name.toString().toUpperCase();
        var dob1 = kyc_res.response_data.dob
          .replace(/\D/g, "")
          .toString()
          .trim();
        var dob2 = user.dob.replace(/\D/g, "").toString().trim();

        // console.log("dob_UIDAI: ", dob1);
        // console.log("dob_database: ", dob2);

        // console.log("name_UIDAI: ", name);
        // console.log("name_database: ", given_legalname);

        if (name == given_legalname && dob1 != dob2) {
          user.document_value = null;
          user.isPersonalFilled = 0;
          user.isAddressFilled = 0;
          user.document_type = document_Type_Enum.PAN;
          user.legalname = null;
          user.dob = null;
          user.phone_number = null;
          await this.userRepository.save(user);

          const user_kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
          });
          if (user_kyc) {
            user_kyc.kyc_status = kyc_status_enum.Rejected;

            await this.kycRepository.save(user_kyc);
          }
          Logger.log(
            "Inside fetchKyc: DATABASE DOB & AADHAAR DOB NOT MATCHED ",
            "fetchKyc"
          );

          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Inavlid Date Of Birth OR Name Or Aadhaar Number ",
            data: null,
          });
        }

        //New Update
        if (name !== given_legalname && dob1 != dob2) {
          user.document_value = null;
          user.document_type = document_Type_Enum.PAN;
          user.legalname = null;
          user.dob = null;
          user.isAddressFilled = 0;
          user.isPersonalFilled = 0;
          user.phone_number = null;
          await this.userRepository.save(user);

          const user_kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
          });
          if (user_kyc) {
            user_kyc.kyc_status = kyc_status_enum.Rejected;
            //user_kyc.api_repsonse = `Rejected at:  ${Date.now().toLocaleString()} by uuid: ${uuid}`;
            await this.kycRepository.save(user_kyc);
          }
          Logger.log(
            "Inside fetchKyc: DATABASE And AADHAAR NAME NOT MATCHED ",
            "fetchKyc"
          );

          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Inavlid Date Of Birth Or Name Or Aadhaar Number",
            data: [],
          });
        }

        if (name === given_legalname && dob1 === dob2) {
          Logger.log(
            "Inside fetchKyc: DATABASE And AADHAAR NAME & DOB MATCHED ",
            "fetchKyc"
          );

          //Update the userKYC:
          const user_kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
          });
          if (!user_kyc || user_kyc == undefined || user_kyc === null) {
            var new_user_kyc = await this.kycRepository.create({
              kyc_user_id: user_id,
            });
            new_user_kyc.kyc_status = kyc_status_enum.Completed;
            new_user_kyc.acknowledgement_number =
              kyc_res.response_data.reference_id;
            new_user_kyc.api_repsonse = JSON.stringify(kyc_res);
            new_user_kyc.vendor_id = `${user_id}`;
            new_user_kyc.token =
              uuid != null
                ? uuid
                : `${Math.random()
                    .toString(36)
                    .substring(2, 10)}-${Math.random()
                    .toString(36)
                    .substring(2, 10)}`;
            //user_kyc.created_ip = req_data.ip ? req_data.ip : "";
            // user_kyc.created_datetime = new Date();
            await this.kycRepository.save(new_user_kyc);
          } else {
            user_kyc.kyc_status = kyc_status_enum.Completed;
            user_kyc.acknowledgement_number =
              kyc_res.response_data.reference_id;
            user_kyc.api_repsonse = JSON.stringify(kyc_res);
            await this.kycRepository.save(user_kyc);
          }
          const user_info_update = await this.userRepository.findOne({
            where: { user_id: user_id },
          });
          if (user_info_update) {
            user_info_update.document_type = document_Type_Enum.AADHAR;
            user_info_update.document_value = aadhaar;
            await this.userRepository.save(user_info_update);
          }

          //Send email comfirmation to user:
          var email_subject: string, email_body: string;
          const email_format = await this.emailRepository.findOne({
            where: { email_keyword: "KYCSUCCESSFUL" },
          });
          if (email_format) {
            email_subject = email_format.subject.concat(
              ": AADHAAR : Dep_App_Version"
            );
            email_body = email_format.description
              .toString()
              .replace(/first name/g, `${user_info_update.first_name}`)
              .replace(/\(/g, "")
              .replace(/\)/g, "")
              .replace(/\{/g, "")
              .replace(/\}/g, "")
              .replace(
                /url_customer_support/g,
                "https://www.moleculus.network/"
              );
          }

          //console.log("e_response", e_response);

          return res.status(200).json({
            code: "200",
            status: "success",
            message: "KYC Details matched, user verified",
            data: [],
          });
        } else {
          user.document_value = null;
          user.document_type = document_Type_Enum.PAN;
          user.legalname = null;
          user.dob = null;
          user.isAddressFilled = 0;
          user.isPersonalFilled = 0;
          user.phone_number = null;
          await this.userRepository.save(user);

          const user_kyc = await this.kycRepository.findOne({
            where: { kyc_user_id: user_id },
            order: { kyc_id: "DESC" },
          });
          if (user_kyc) {
            user_kyc.kyc_status = kyc_status_enum.Rejected;
            //user_kyc.api_repsonse = `Rejected at:  ${Date.now().toLocaleString()} by uuid: ${uuid}`;
            await this.kycRepository.save(user_kyc);
          }
          Logger.log(
            "Inside fetchKyc: DATABASE And AADHAAR NAME NOT MATCHED ",
            "fetchKyc"
          );

          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Inavlid Date Of Birth Or Name Or Aadhaar Number",
            data: [],
          });
        }
      } else if (kyc_res.response_status.code !== "000") {
        return res.status(400).json({
          code: "400",
          status: "error",
          message:
            "Could Not verify KYC Details, UIDAI Server error, try again later",
          data: [],
        });
      }
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "UIDAI Server Error, Please try again later",
        data: [],
      });
    }
  }

  @Post("/fillsignupform")
  @UsePipes(ValidationPipe)
  async fillSignUpForm(
    @Body() fillSignUpFormDto: FillSignUpFormDto,
    @Res() res: Response
  ) {
    var isPhoneNumberEntered = false;
    var email_body: string = "";
    var email_subject: string = "";
    const user_id = parseInt(fillSignUpFormDto.user_id);
    const phone_number = fillSignUpFormDto.phone_number;
    const user_check = await this.usersService.findOne(user_id);

    const user_email_format = await this.emailRepository.findOne({
      where: { email_keyword: "WELCOMEVERIFIEDACCOUNT" },
    });

    if (user_email_format) {
      //replace firstname:
      email_body = user_email_format.description
        .toString()
        .replace(/first name/g, `${fillSignUpFormDto.first_name}`)
        .replace(/\(/g, "")
        .replace(/\)/g, "")
        .replace(/\{/g, "")
        .replace(/\}/g, "")
        .replace(/url_customer_support/g, "https://www.moleculus.network/");
      email_subject = user_email_format.subject;
    }

    if (!user_check) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such User! ",
        data: null,
      });
    }
    const user_email = user_check.email_id;

    if (
      phone_number !== null &&
      phone_number !== undefined &&
      phone_number !== ""
    ) {
      if (phone_number.length < 9) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Phone number length invalid!",
          data: [],
        });
      }

      const isPhoneTaken = await this.usersService.findPhoneNumber(
        phone_number
      );
      if (isPhoneTaken) {
        if (isPhoneTaken.user_id != user_id) {
          Logger.log(
            "Inside fillSignUpForm: PHONE NUMBER ALREADY TAKEN ",
            "fillSignUpForm"
          );
          return res.status(400).json({
            code: "400",
            status: "error",
            message: "Error Occured , Phone number already taken",
            data: null,
          });
        }
      }

      //TODO: OTP Logic Here:
      isPhoneNumberEntered = true;
    }
    const filled_form_user = await this.usersService.fillSignUpForm(
      fillSignUpFormDto,
      user_id
    );
    if (filled_form_user) {
      //mail to be sent for succesful signup:
      const mail_response = await this.mailService
        .sendMail(email_subject, email_body, user_email)
        .then((res) => {
          console.log("Signup_mail_sent_successfully: ", res);
          console.log("Email_Body: ", email_body);
          console.log("Email_Subject: ", email_subject);
        })
        .catch((err) => {
          console.log("Error_Sending _mail: ", err);
        });

      console.log("user_email_description_respo: ", mail_response);
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Signup successful ",
        data: {
          user_id: filled_form_user.user_id,
          isPhoneNumberEntered: isPhoneNumberEntered,
        },
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, in signup form fill",
        data: null,
      });
    }
  }

  @Post("/update/phonenumber")
  @UsePipes(ValidationPipe)
  async updatePhoneNumber(
    @Body() updatePhoneNumberDto: UpdatePhoneNumberDto,
    @Res() res: Response
  ) {
    const { phone_number, user_id } = updatePhoneNumberDto;
    try {
      const result = await this.usersService.updatePhoneNumber(
        user_id,
        phone_number
      );
      if (result) {
        result.password = undefined;
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "Phone number has been updated successfully!",
          data: null,
        });
      } else {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured !",
          data: result,
        });
      }
    } catch (error) {
      Logger.error("Error: ", error);
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured !",
        data: error,
      });
    }
  }

  @Post("deleteusermbyemail")
  async deleteUserByEmail(@Body() body: any, @Res() res: Response) {
    const user = await this.userRepository.findOne({
      where: { email_id: body.email_id },
    });
    if (!user || user == undefined || user === null) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such User found! ",
        data: null,
      });
    } else {
      const delete_user = await this.usersService.forceDeleteUser(
        body.email_id
      );

      if (!delete_user || delete_user == undefined || delete_user === null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, User not deleted ",
          data: null,
        });
      } else {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "User deleted successfully!",
          data: null,
        });
      }
    }
  }

  @Post("/update/address")
  @UsePipes(ValidationPipe)
  async updateAddress(
    @Body() updateAddressDto: UpdateAddressDto,
    @Request() req: RequestEx,
    @Res() res: Response
  ) {
    const user_id_ = parseInt(req.body.user_id);
    const user_check = await this.usersService.findOne(user_id_);
    if (!user_check) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such User! ",
        data: null,
      });
    }
    const user_address = await this.usersService.updateAddress(
      user_id_,
      updateAddressDto
    );
    if (user_address) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Address Updated Successfully",
        data: user_address,
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, No such user in User Address Table ",
        data: null,
      });
    }
  }

  @Put("update/email")
  @UsePipes(ValidationPipe)
  async updateEmail(@Body() body, @Res() res: Response) {
    const { new_email_id, existing_email_id, user_id } = body;
    if (new_email_id == existing_email_id) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    const user = await this.usersService.findOne(parseInt(user_id));

    const user2 = await this.usersService.findUserByEmail(existing_email_id);

    if (user2.user_id !== user.user_id) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    if (!user) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    const email_update = await this.usersService.updateEmail(
      user_id,
      new_email_id
    );
    if (email_update) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Email OTP has been sent successfully, please verfiy now.. ",
        data: null,
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
  }

  @Put("change/password")
  async changePassword(@Body() body, @Res() res: Response) {
    const { user_id, old_password, new_password } = body;
    if (old_password === new_password) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, please Provide different passwords ",
        data: null,
      });
    }
    if (!old_password || !new_password || !user_id) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message:
          "Error Occured, please provide  old, new Passwords and email_id ",
        data: null,
      });
    } else {
      const result = await this.usersService.changePassword(
        parseInt(user_id),
        old_password,
        new_password
      );
      if (!result || result === undefined || result === null) {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured, please provide correct password ",
          data: null,
        });
      } else {
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "Password has been changed successfully ",
          data: null,
        });
      }
    }
  }
  @Put("reset/password")
  async resetPassword(@Res() res: Response, @Body() body: any) {
    const { newPassword } = body;
    const user_id = parseInt(body.user_id);
    let email_id;

    const user = await this.usersService.findOne(user_id);

    if (user === null || user === undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: null,
      });
    }
    try {
      email_id = user.email_id;
      const user_ = await this.usersService.updatePassword(
        user_id,
        newPassword
      );
      if (user_) {
        user_.password = undefined;
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "User's Password has been updated successfully",
          data: user_.user_id,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured ",
        data: e.message,
      });
    }
  }

  @Post("update/tfastatus")
  async updateTfa(@Body() Body: any, @Res() res: Response) {
    const { user_id, otp } = Body;
    const user = await this.usersService.findOne(parseInt(user_id));
    console.log(user);
    if (!user) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured",
        data: null,
      });
    }

    const result = await this.usersService.verifyTFA(otp, parseInt(user_id));
    if (result === true) {
      const user_ = await this.usersService.updateTfa(user_id);
      if (user_) {
        user_.password = undefined;
        return res.status(200).json({
          code: "200",
          status: "success",
          message: "TFA status has been updated successfully",
          data: user_,
        });
      } else {
        return res.status(400).json({
          code: "400",
          status: "error",
          message: "Error Occured",
          data: user_,
        });
      }
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Errror Occured, Invalid OTP",
        data: null,
      });
    }
  }

  @Post("/getgraphdata")
  async getGraphData(@Res() res: Response, @Body() body: any) {
    if (body == null || body.user_id == undefined || body.user_id == "") {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Error Occured, empty body",
        data: null,
      });
    }
    console.log(body);
    const balanceArrayMonths = [
      "200.34",
      "310.64",
      "370.34",
      "323.34",
      "440.49",
      "576.64",
      "597.64",
      "600.23",
      "598.83",
      "610.30",
      "612.23",
      "640.12",
    ];
    const balanceUsdCoin = "85.67896509";
    return res.status(200).json({
      code: "200",
      status: "success",
      message: "Graph Data has been fetched successfully",
      data: { ...balanceArrayMonths, balanceUsdCoin },
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
