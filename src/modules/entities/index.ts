import { moleculus_sip_transactions } from "././siptransactions.entity";
import { moleculus_admin } from "./admin.entity";
import { moleculus_cities } from "./cities.entity";
import { moleculus_countries } from "./countries.entity";
import { moleculus_email_template } from "./email-template.entity";
import { moleculus_index_tokens } from "./index_tokens.entity";
import { moleculus_login_log } from "./loginLog.entity";
import { moleculus_pages } from "./pages.entity";
import { moleculus_settings } from "./settings.entity";
import { moleculus_sip } from "./sip.entity";
import { moleculus_states } from "./states.entity";
import { moleculus_user as User } from "./user.entity";
import { moleculus_user_address } from "./userAddress.entity";
import { moleculus_user_kyc } from "./userKYC.entity";
import { moleculus_user_notification } from "./userNotification.entity";

const entities = [
  moleculus_settings,
  moleculus_sip,
  moleculus_sip_transactions,
  moleculus_user_kyc,
  moleculus_index_tokens,
  moleculus_countries,
  User,
  moleculus_states,
  moleculus_pages,
  moleculus_user_notification,
  moleculus_user_address,
  moleculus_sip,
  moleculus_admin,
  moleculus_email_template,
  moleculus_login_log,
  // moleculus_cities,
];

export {
  moleculus_settings,
  moleculus_sip,
  User,
  moleculus_pages,
  moleculus_user_notification,
  moleculus_user_address,
  moleculus_admin,
  moleculus_email_template,
  moleculus_login_log,
  moleculus_user_kyc,
  moleculus_index_tokens,
  moleculus_countries,
  moleculus_states,
  // moleculus_cities,
  moleculus_sip_transactions,
};

export default entities;
