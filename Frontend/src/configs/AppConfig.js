import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { AUTH_TOKEN } from 'redux/constants/Auth';
import { env } from './EnvironmentConfig'
import jwt_decode from "jwt-decode";

export const APP_NAME = 'Emilus';
export const API_BASE_URL = env.API_ENDPOINT_URL || 'http://localhost:3000'
export const APP_PREFIX_PATH = '/app';
export const WARD_PREFIX_PATH = '/ward';
export const FRONTLINE_CHANNELLING_PREFIX_PATH = '/frontchannelling';
export const CHANNELLING_PREFIX_PATH = '/frontchannelling';
export const DOCTOR_CHANNELLING_PREFIX_PATH = '/doctorchannelling';
export const INVENTORY_PREFIX_PATH = '/inventory';
export const BILLING_PREFIX_PATH = '/billing';
export const PATIENT_PREFIX_PATH = '/patient';
export const BLOODBANK_PREFIX_PATH = '/bloodbank';
export const MORTUARY_PREFIX_PATH = '/mortuary';
export const STAFF_PREFIX_PATH = '/staff';
export const AUTH_PREFIX_PATH = '/auth';

// roles

export const FRONTLINE_CHANNELLING_ROLE = 'doctor';
export const DOCTOR_CHANNELLING_ROLE = 'doctor';
export const INVENTORY_ROLE = '';
export const BILLING_ROLE = '';
export const PATIENT_ROLE = '';
export const BLOODBANK_ROLE = '';
export const MORTUARY_ROLE = '';
export const STAFF_ROLE = '';
export const WARD_ROLE = 'ward';


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


  export const ValidateUser = (role) => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);
	
	if(mytoken){
		var decoded = jwt_decode(mytoken)

		if(decoded.role != role){
			localStorage.clear();
			window.location = APP_PREFIX_PATH;
		}

	}
    else{
        window.location = APP_PREFIX_PATH;
    }

}

export const setTokenMeta = () => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);
	if(mytoken){
		var decoded = jwt_decode(mytoken)
		localStorage.setItem('name', decoded.name);
		localStorage.setItem('role', decoded.role);
	}
}