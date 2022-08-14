import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum is_email_verified_Enum {
  Yes = "Yes",
  No = "No",
}

export enum document_Type_Enum {
  SSN = "SSN",
  TIN = "TIN",
  AADHAR = "AADHAR",
  PAN = "PAN",
}

export enum is_phone_verified_Enum {
  Yes = "Yes",
  No = "No",
}

export enum status_Enum {
  Enable = "Enable",
  Disable = "Disable",
}

export enum is_deleted_Enum {
  Yes = "Yes",
  No = "No",
}

export enum dark_mode_Enum {
  On = "On",
  Off = "Off",
}

export enum biometric_Enum {
  On = "On",
  Off = "Off",
}

export enum google_auth_enabled_Enum {
  Enable = "Enable",
  Disable = "Disable",
}

export enum user_login_type_Enum {
  Normal = "Normal",
  Apple = "Apple",
  Google = "Google",
  Facebook = "Facebook",
  Twitter = "Twitter",
}

@Entity()
export class moleculus_user {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  user_id: number;

  @Column({ type: "varchar", length: 512, nullable: true })
  legalname: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  first_name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  last_name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    unique: true,
  })
  email_id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  temp_email_id: string;

  @Column({
    nullable: true,
    default: null,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  country_name: string;

  @Column({
    type: "int",
    nullable: true,
  })
  country_id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  state_name: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  phone_code: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  email_token: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  phone_number: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
    default: "123456",
  })
  otp: string;

  @Column({
    type: "bigint",
    nullable: true,
  })
  otp_creation_time: number;

  @Column({
    type: "enum",
    enum: is_email_verified_Enum,
    default: is_email_verified_Enum.No,
  })
  is_email_verify: is_email_verified_Enum;

  @Column({
    type: "enum",
    enum: is_phone_verified_Enum,
    default: is_phone_verified_Enum.No,
  })
  is_phone_verify: is_phone_verified_Enum; //document_Type_Enum

  @Column({
    type: "enum",
    enum: document_Type_Enum,
    default: document_Type_Enum.SSN,
  })
  document_type: document_Type_Enum;

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  document_value: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  dob: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  tin: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  ssn: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  citizenship: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  city: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  zipcode: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  wallet_balance: number;

  @Column({
    type: "enum",
    enum: status_Enum,
    default: status_Enum.Enable,
  })
  status: status_Enum;

  @Column({
    type: "enum",
    enum: is_deleted_Enum,
    default: is_deleted_Enum.No,
  })
  is_deleted: is_deleted_Enum;

  @Column({
    type: "varchar",
    length: 255,
    default: "USD",
  })
  default_currency: string;

  @Column({
    type: "smallint",
    default: 0,
  })
  isSignupFilled: number;

  @Column({
    type: "smallint",
    default: 0,
  })
  isPersonalFilled: number;

  @Column({
    type: "smallint",
    default: 0,
  })
  isAddressFilled: number;

  @Column({
    type: "enum",
    enum: dark_mode_Enum,
    default: dark_mode_Enum.Off,
  })
  dark_mode: dark_mode_Enum;

  @Column({
    type: "enum",
    enum: biometric_Enum,
    default: biometric_Enum.Off,
  })
  biometric: biometric_Enum;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  passcode: string;

  @CreateDateColumn()
  created_datetime: Date;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
    nullable: true,
  })
  created_ip: string;

  @UpdateDateColumn({
    nullable: true,
  })
  modified_datetime: Date;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  modified_ip: string;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  google_auth_code: string;

  @Column({
    type: "enum",
    enum: google_auth_enabled_Enum,
    default: google_auth_enabled_Enum.Disable,
  })
  google_auth_enabled: google_auth_enabled_Enum;

  @Column({
    type: "enum",
    enum: user_login_type_Enum,
    default: user_login_type_Enum.Normal,
  })
  user_login_type: user_login_type_Enum;

  @Column({
    type: "varchar",
    length: 255,
    default: null,
  })
  secondary_email: string;
  // @Column({
  //   type: "varchar",
  //   length: 2048,
  //   default: null,
  // })
  // jwt_token: string;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  temp_secret: any;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  auth_o_response: any;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  auth_o_response_decrypted: any;
}
