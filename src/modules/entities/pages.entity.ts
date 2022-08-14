import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export enum page_status_enum {
  Enable = "Enable",
  Disable = "Disable",
}

@Entity()
export class moleculus_pages extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  pagetitle_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  pagetitle: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
    unique: true,
  })
  pageKeyWord: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;
  @Column({
    type: "enum",
    enum: page_status_enum,
    default: page_status_enum.Enable,
  })
  page_status: page_status_enum;

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

  @Column({
    type: "bigint",
    default: 0,
    nullable: true,
  })
  page_country_id: number;

  @Column({
    type: "text",
    nullable: true,
  })
  page_state_id: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;
}
