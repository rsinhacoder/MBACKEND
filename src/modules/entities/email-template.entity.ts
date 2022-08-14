import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export enum page_email_enum {
  Enable = "Enable",
  Disable = "Disable",
}

@Entity()
export class moleculus_email_template extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  email_template_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  email_title: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
    unique: true,
  })
  email_keyword: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
    default: "%  %",
  })
  email_variable: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    type: "text",
    nullable: true,
  })
  subject: string;

  @Column({
    type: "enum",
    enum: page_email_enum,
    default: page_email_enum.Enable,
  })
  email_template_status: page_email_enum;

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
  email_country_id: number;

  @Column({
    type: "text",
    nullable: true,
  })
  email_state_id: string;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;
}
