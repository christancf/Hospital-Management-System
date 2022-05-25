import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import JwtAuthService from 'services/JwtAuthService'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import jwt_decode from "jwt-decode";
import { WARD_PREFIX_PATH, APP_PREFIX_PATH, WARD_ROLE, setTokenMeta } from 'configs/AppConfig'

const ValidateUser = (role) => {

	var mytoken = localStorage.getItem(AUTH_TOKEN);
	
	if(mytoken){
		var decoded = jwt_decode(mytoken)

		if(decoded.role == role){
			window.location = WARD_PREFIX_PATH;
		}
		else{
			localStorage.clear();
			window.location = APP_PREFIX_PATH;
		}

	}

}

export const LoginForm = (props) => {

	ValidateUser(WARD_ROLE);
	let history = useHistory();

	const { 
		otherSignIn, 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra,
		loading,
		showMessage,
		message,
		authenticated,
		showAuthMessage,
		token,
		redirect,
		allowRedirect
	} = props

	const onLogin = values => {
		showLoading()
		JwtAuthService.login(values).then(resp => {

			console.log(resp)
			if(resp.succuss){
				authenticated(resp.payload.token)
				localStorage.setItem(AUTH_TOKEN, resp.payload.token);
				setTokenMeta();
				window.location = WARD_PREFIX_PATH;
			}
			else{
				showAuthMessage(resp.message);
			}
			
			
		}).catch(e => {
			showAuthMessage("Something wrong please try again !");
		})
	};



	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
			setTimeout(() => {
			hideAuthMessage();
		}, 3000);
		}
	});
	

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
				
			>
					<Form.Item 
					name="role" 
					initialValue={WARD_ROLE}
					>
					<Input hidden/>
				</Form.Item>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email',
						},
						{ 
							type: 'email',
							message: 'Please enter a validate email!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>
				
				{ extra }
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
