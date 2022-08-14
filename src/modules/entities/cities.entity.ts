/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export class moleculus_cities extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  pk_city_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  city_name: string;

  @Index()
  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  city_state_abbreviation: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  city_country_id: string;
}
