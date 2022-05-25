import React from 'react'
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { DOCTOR_CHANNELLING_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

const ValidateUser = (role) => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);
	
	if(mytoken){
		var decoded = jwt_decode(mytoken)

		if(decoded.role == role){
			window.location = DOCTOR_CHANNELLING_PREFIX_PATH;
		}
		else{
			localStorage.clear();
			window.location = APP_PREFIX_PATH;
		}

	}

}

const Home = () => {

	ValidateUser('doctor');
	return (
		<div>
			This is Doctor channelling reports
		</div>
	)
}

export default Home
