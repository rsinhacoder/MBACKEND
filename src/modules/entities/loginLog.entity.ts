/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

export enum Login_log_enum {
  Enable = "Enable",
  Disable = "Disable",
}
@Entity()
export class moleculus_login_log extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  login_log_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  logged_user_country_of_login: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  logged_user_email: string;
  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  logged_user_id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  logged_user_name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  logged_user_ip: string;

  @Column({
    type: "enum",
    enum: Login_log_enum,
    default: Login_log_enum.Enable,
  })
  setting_status: Login_log_enum;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  log_in_datetime: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  log_out_datetime: Date;

  @Column({
    type: "boolean",
    default: false,
  })
  is_login_log_deleted: boolean;
}
