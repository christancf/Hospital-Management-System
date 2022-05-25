import React from 'react'
import jwt_decode from "jwt-decode";
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { DOCTOR_CHANNELLING_PREFIX_PATH, APP_PREFIX_PATH, DOCTOR_CHANNELLING_ROLE, ValidateUser } from 'configs/AppConfig'

ValidateUser(DOCTOR_CHANNELLING_ROLE);


const Home = () => {


	return (
		<div>
			This is Doctor channelling reports
		</div>
	)
}

export default Home
