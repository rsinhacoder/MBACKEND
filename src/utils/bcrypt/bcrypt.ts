/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import * as bcrypt from "bcrypt";
require("dotenv").config({ debug: false });

export function encodePassword(rawPassword: string) {
  const SALT = process.env.SALT;

  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
