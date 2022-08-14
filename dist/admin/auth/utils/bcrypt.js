"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordAdmin = exports.encodePasswordAdmin = void 0;
const bcrypt = require("bcrypt");
require("dotenv").config({ debug: false });
function encodePasswordAdmin(rawPassword) {
    const SALT = process.env.ADMIN_SALT;
    return bcrypt.hashSync(rawPassword, SALT);
}
exports.encodePasswordAdmin = encodePasswordAdmin;
function comparePasswordAdmin(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}
exports.comparePasswordAdmin = comparePasswordAdmin;
//# sourceMappingURL=bcrypt.js.map