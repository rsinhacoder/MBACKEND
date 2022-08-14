/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from "typeorm";

export enum sip_status_enum {
  Active = "Active",
  Pause = "Pause",
  Cancel = "Cancel",
}

export enum sip_day_enum {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Bimonthly = "Bimonthly",
}

@Entity()
export class moleculus_sip extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  user_sip_id: number;

  @Index()
  @Column({
    type: "int",
    nullable: true,
  })
  sip_user_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  token_name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  token_price: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  token_code: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  token_current_price: string;

  @Column({
    type: "enum",
    enum: sip_day_enum,
    default: sip_day_enum.Bimonthly,
  })
  sip_day: sip_day_enum;

  @Column({
    type: "enum",
    enum: sip_status_enum,
    default: sip_status_enum.Active,
  })
  sip_status: sip_status_enum;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  sip_comment: string;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  sip_start_date: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  sip_end_date: Date;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  sip_next_date: Date;

  @Column({
    type: "int",
    nullable: true,
  })
  sip_bank_id: number;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_datetime: Date;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  created_ip: string;
}
