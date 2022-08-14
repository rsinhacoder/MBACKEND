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
export class moleculus_states extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  pk_state_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  state_name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  state_abbreviation: string;

  @Column({
    type: "int",
    nullable: true,
  })
  state_country_id: number;
}
