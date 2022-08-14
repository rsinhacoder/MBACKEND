"use strict";
exports.__esModule = true;
exports.comparePassword = exports.encodePassword = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
var bcrypt = require("bcrypt");
require("dotenv").config({ debug: false });
function encodePassword(rawPassword) {
    var SALT = process.env.SALT;
    return bcrypt.hashSync(rawPassword, SALT);
}
exports.encodePassword = encodePassword;
function comparePassword(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePassword = comparePassword;
