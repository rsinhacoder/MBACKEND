"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
require("dotenv").config({ debug: false });
function encodePassword(rawPassword) {
    const SALT = process.env.SALT;
    return bcrypt.hashSync(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
function comparePassword(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map