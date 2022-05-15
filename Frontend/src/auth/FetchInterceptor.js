import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { notification } from 'antd';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

service.interceptors.request.use(config => {
	
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080';
	config.headers['Access-Control-Allow-Credentials'] = 'true';
  


  return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

// // Config
const ENTRY_ROUTE = '/'
const TOKEN_PAYLOAD_KEY = 'x-access-token'
const PUBLIC_REQUEST_KEY = 'public-request'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN)
	
  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = jwtToken
  }

  if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
		history.push(ENTRY_ROUTE)
		window.location.reload();
  }

  return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, (error) => {

	return Promise.reject(error);
});

export default service