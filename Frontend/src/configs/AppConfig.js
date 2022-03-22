import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'Emilus';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '/app';
export const WARD_PREFIX_PATH = '/ward';
export const CHANNELLING_PREFIX_PATH = '/channelling';
export const INVENTORY_PREFIX_PATH = '/inventory';
export const BILLING_PREFIX_PATH = '/billing';
export const PATIENT_PREFIX_PATH = '/patient';
export const BLOODBANK_PREFIX_PATH = '/bloodbank';
export const MORTUARY_PREFIX_PATH = '/mortuary';
export const STAFF_PREFIX_PATH = '/staff';
export const AUTH_PREFIX_PATH = '/auth';

export const THEME_CONFIG = {
	"navType": "SIDE",
	"sideNavTheme": "SIDE_NAV_LIGHT",
	"navCollapsed": false,
	"topNavColor": "#3e82f7",
	"headerNavColor": "#ffffffff",
	"locale": "en",
	"currentTheme": "light",
	"direction": "ltr"
  };