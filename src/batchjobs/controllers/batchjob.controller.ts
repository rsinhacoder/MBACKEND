import {
  Controller,
  Get,
  Inject,
  Post,
  Delete,
  Logger,
  Res,
  Body,
} from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import axios from "axios";
import { Response } from "express";
import { BatchJobService } from "../services/batchjob.service";

const schedule = require("node-schedule");

@Controller("/batchjobs")
export class BatchJobController {
  constructor(
    @Inject("BATCH_JOB_SERVICE")
    private readonly batchJobService: BatchJobService
  ) {}

  @Post("/testjob")
  async getBatchJob(@Res() res: Response, @Body() body) {
    Logger.log("getBatchJob", "BatchJobController");
    console.log(body);
    const result = await this.batchJobService.getBatchJob(body.user_id);
    if (!result || result == null || result == undefined) {
      return res.status(400).json({
        code: "400",
        status: "error",
        message: "user not found",
        data: null,
      });
    } else {
      return res.status(200).json({
        code: "200",
        status: "success",
        message: "user found",
        data: result,
      });
    }
  }

  async ptint() {
    console.log("print");
  }

  job1 = schedule.scheduleJob("5 15 0 0 * *", async function jobone() {
    const r = await axios.post(
      "https://nestjs-moleculus-ris-2107.vercel.app/api/v1/batchjobs/testjob",
      { user_id: "59", data: "Sample" }
    );
    console.log(
      "####################-The task runs at 00:00:15 -######################"
    );
    console.log(await r.data);
  });
}
