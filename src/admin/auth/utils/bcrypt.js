"use strict";
exports.__esModule = true;
exports.comparePasswordAdmin = exports.encodePasswordAdmin = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
var bcrypt = require("bcrypt");
require("dotenv").config({ debug: false });
function encodePasswordAdmin(rawPassword) {
    var SALT = process.env.ADMIN_SALT;
    return bcrypt.hashSync(rawPassword, SALT);
}
exports.encodePasswordAdmin = encodePasswordAdmin;
function comparePasswordAdmin(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePasswordAdmin = comparePasswordAdmin;
