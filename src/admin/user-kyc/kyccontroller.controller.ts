import { Body, Controller, Inject, Logger, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { KYCService } from "./kyc-service";

@Controller("admin/kyccontroller")
export class KyccontrollerController {
  constructor(
    @Inject("KYC_SERVICE")
    private readonly kycService: KYCService
  ) {}

  @Post("/changekycstatus")
  async changekycstatus(@Res() res: Response, @Body() body: any) {
    console.log(body);
    
    Logger.log("info", "KycController");
    const { user_id, required_status } = body;
    const info = await this.kycService.changekycstatus(
      user_id,
      required_status
    );
    if (info) {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "Status updated successfully! ",
        data: info,
      });
    } else {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "Status not updated",
        data: [],
      });
    }
  }
}
