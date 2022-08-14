/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  BaseEntity,
} from "typeorm";

export enum kyc_status_enum {
  Pending = "Pending",
  Rejected = "Rejected",
  Completed = "Completed",
}
@Entity()
export class moleculus_user_kyc extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  kyc_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  acknowledgement_number: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  vendor_id: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  previous_status: string;

  @Column({
    type: "bigint",
    nullable: true,
  })
  kyc_user_id: number;
  @Column({
    type: "text",
    nullable: true,
  })
  token: string;

  @Column({
    type: "text",
    nullable: true,
  })
  api_repsonse: string;

  @Column({
    type: "enum",
    enum: kyc_status_enum,
    default: kyc_status_enum.Pending,
  })
  kyc_status: kyc_status_enum;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  created_datetime: Date;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  created_ip: string;
}
