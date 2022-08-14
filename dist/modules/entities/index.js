"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moleculus_sip_transactions = exports.moleculus_states = exports.moleculus_countries = exports.moleculus_index_tokens = exports.moleculus_user_kyc = exports.moleculus_login_log = exports.moleculus_email_template = exports.moleculus_admin = exports.moleculus_user_address = exports.moleculus_user_notification = exports.moleculus_pages = exports.User = exports.moleculus_sip = exports.moleculus_settings = void 0;
const siptransactions_entity_1 = require("././siptransactions.entity");
Object.defineProperty(exports, "moleculus_sip_transactions", { enumerable: true, get: function () { return siptransactions_entity_1.moleculus_sip_transactions; } });
const admin_entity_1 = require("./admin.entity");
Object.defineProperty(exports, "moleculus_admin", { enumerable: true, get: function () { return admin_entity_1.moleculus_admin; } });
const countries_entity_1 = require("./countries.entity");
Object.defineProperty(exports, "moleculus_countries", { enumerable: true, get: function () { return countries_entity_1.moleculus_countries; } });
const email_template_entity_1 = require("./email-template.entity");
Object.defineProperty(exports, "moleculus_email_template", { enumerable: true, get: function () { return email_template_entity_1.moleculus_email_template; } });
const index_tokens_entity_1 = require("./index_tokens.entity");
Object.defineProperty(exports, "moleculus_index_tokens", { enumerable: true, get: function () { return index_tokens_entity_1.moleculus_index_tokens; } });
const loginLog_entity_1 = require("./loginLog.entity");
Object.defineProperty(exports, "moleculus_login_log", { enumerable: true, get: function () { return loginLog_entity_1.moleculus_login_log; } });
const pages_entity_1 = require("./pages.entity");
Object.defineProperty(exports, "moleculus_pages", { enumerable: true, get: function () { return pages_entity_1.moleculus_pages; } });
const settings_entity_1 = require("./settings.entity");
Object.defineProperty(exports, "moleculus_settings", { enumerable: true, get: function () { return settings_entity_1.moleculus_settings; } });
const sip_entity_1 = require("./sip.entity");
Object.defineProperty(exports, "moleculus_sip", { enumerable: true, get: function () { return sip_entity_1.moleculus_sip; } });
const states_entity_1 = require("./states.entity");
Object.defineProperty(exports, "moleculus_states", { enumerable: true, get: function () { return states_entity_1.moleculus_states; } });
const user_entity_1 = require("./user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.moleculus_user; } });
const userAddress_entity_1 = require("./userAddress.entity");
Object.defineProperty(exports, "moleculus_user_address", { enumerable: true, get: function () { return userAddress_entity_1.moleculus_user_address; } });
const userKYC_entity_1 = require("./userKYC.entity");
Object.defineProperty(exports, "moleculus_user_kyc", { enumerable: true, get: function () { return userKYC_entity_1.moleculus_user_kyc; } });
const userNotification_entity_1 = require("./userNotification.entity");
Object.defineProperty(exports, "moleculus_user_notification", { enumerable: true, get: function () { return userNotification_entity_1.moleculus_user_notification; } });
const entities = [
    settings_entity_1.moleculus_settings,
    sip_entity_1.moleculus_sip,
    siptransactions_entity_1.moleculus_sip_transactions,
    userKYC_entity_1.moleculus_user_kyc,
    index_tokens_entity_1.moleculus_index_tokens,
    countries_entity_1.moleculus_countries,
    user_entity_1.moleculus_user,
    states_entity_1.moleculus_states,
    pages_entity_1.moleculus_pages,
    userNotification_entity_1.moleculus_user_notification,
    userAddress_entity_1.moleculus_user_address,
    sip_entity_1.moleculus_sip,
    admin_entity_1.moleculus_admin,
    email_template_entity_1.moleculus_email_template,
    loginLog_entity_1.moleculus_login_log,
];
exports.default = entities;
//# sourceMappingURL=index.js.map