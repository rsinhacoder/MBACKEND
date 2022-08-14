/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

export enum setting_status_enum {
  Enable = "Enable",
  Disable = "Disable",
}
@Entity()
export class moleculus_settings extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  setting_id: number;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  setting_name: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  setting_value: string;

  @Column({
    type: "enum",
    enum: setting_status_enum,
    default: setting_status_enum.Enable,
  })
  setting_status: setting_status_enum;

  @CreateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  created_datetime: Date;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  setting_keyword: string;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  created_ip: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;
}
