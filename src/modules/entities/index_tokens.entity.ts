import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export enum page_status_enum {
  Enable = "Enable",
  Disable = "Disable",
}

@Entity()
export class moleculus_index_tokens extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  index_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    unique: true,
  })
  token_code: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  index_name: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  index_price: string;

  @Column({
    type: "text",
    nullable: true,
  })
  index_description: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  index_profit: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  index_profit_percent: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  index_total_value: string;
}
