/* eslint-disable prettier/prettier */
import { randomInt } from "crypto";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class moleculus_user_address extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  address_id: number;

  //   @ManyToOne(() => moleculus_users)
  //   @JoinColumn()
  @Column({
    type: "bigint",
    nullable: true,
  })
  user_address_id: number;

  @Column({
    type: "text",
    nullable: true,
  })
  address_line1: string;

  @Column({
    type: "text",
    nullable: true,
  })
  address_line2: string;

  @Column({
    type: "text",
    nullable: true,
  })
  other_info: string;

  @Column({
    type: "timestamptz",
    nullable: true,
  })
  created_datetime: Date;

  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  created_ip: string;
}
