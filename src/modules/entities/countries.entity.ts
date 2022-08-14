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
export class moleculus_countries extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  pk_country_id: number;

  @Column({
    type: "int",
    nullable: true,
  })
  country_id: number;

  @Column({
    type: "varchar",
    length: 2048,
    nullable: true,
  })
  country_flag: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  country_sortname: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  country_phone_code: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  country_name: string;
}
