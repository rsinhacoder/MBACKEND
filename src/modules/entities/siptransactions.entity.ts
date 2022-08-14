/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from "typeorm";

export enum tra_status_enum {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}
@Entity()
export class moleculus_sip_transactions extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  sip_tra_id: number;

  @Column({
    type: "int",
    nullable: true,
  })
  sip_id: number;

  @Index()
  @Column({
    type: "bigint",
    nullable: true,
  })
  tra_user_id: number;

  @Index()
  @Column({
    type: "varchar",
    length: 255,
    default: "",
    nullable: true,
  })
  token_code: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  trasaction_price: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  trasaction_currency: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  token_name: string;

  @Column({
    type: "enum",
    enum: tra_status_enum,
    default: tra_status_enum.Pending,
  })
  tra_status: tra_status_enum;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_datetime: Date;
}
