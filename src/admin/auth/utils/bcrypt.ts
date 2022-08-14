/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import * as bcrypt from "bcrypt";
require("dotenv").config({ debug: false });

export function encodePasswordAdmin(rawPassword: string) {
  const SALT = process.env.ADMIN_SALT;

  return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePasswordAdmin(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
