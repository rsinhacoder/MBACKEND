import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

export enum google_auth_enabled_Enum {
  Enable = "Enable",
  Disable = "Disable",
}

@Entity()
export class moleculus_admin extends BaseEntity {
  @PrimaryColumn({
    type: "bigint",
    generated: true,
  })
  admin_id: number;
  @Column({
    type: "varchar",
    length: 255,
    default: "",
  })
  google_auth_code: string;

  @Column({
    type: "enum",
    enum: google_auth_enabled_Enum,
    default: google_auth_enabled_Enum.Disable,
  })
  google_auth_enabled: google_auth_enabled_Enum;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  temp_secret: any;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  first_name: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  last_name: string;

  @Column({
    length: 255,
    type: "varchar",
    unique: true,
    nullable: true,
  })
  email_id: string;

  @Column({
    length: 512,
    type: "varchar",
    nullable: false,
  })
  password: string;

  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  username: string;

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
    type: "varchar",
    length: 255,
    nullable: true,
  })
  admin_profile: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  admin_slug: string;

  @Column({
    type: "boolean",
    default: true,
  })
  super_admin_role: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  is_deleted: boolean;
}
