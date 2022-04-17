import React from 'react'
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography
const { Search } = Input;

const StaffSalaryBonuses = () => {
	return (
		<div>
			<Title>Staff Salary Bonuses</Title>
			<Demo></Demo>
		</div>
	)
}

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
  };
const tailLayout = {
	wrapperCol: { offset: 5, span: 16 },
  };

  const Demo = () => {
  

	const onFinish = values => {
	};
  
	const onFinishFailed = errorInfo => {
	}; 
  
	const searchById = (id) => {
	};
  
	return (
	  <Form
		{...layout}
		name="basic"
		initialValues={{ remember: true }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
	  >
		<Form.Item
		  label="Staff ID"
		  name="staffID"
		  rules={[{ required: true, message: 'Please input the staff ID!' }]}
		>
		   <Search placeholder="Enter Staff ID" onSearch={id => searchById(id)} enterButton />
		</Form.Item>
  
		<Form.Item
		  label="Name"
		  name="staffName"
		  //rules={[{ required: true, message: 'Please input the name!' }]}
		>
		  <Input disabled="true" id="staffName" />
		</Form.Item>
  
		<Form.Item
		  label="NIC"
		  name="NIC"
		  //rules={[{ required: true, message: 'Please input the NIC!' }]}
		>
		  <Input disabled="true" id="NIC" />
		</Form.Item>
  
		<Form.Item
		  label="Designation"
		  name="designation"
		  //rules={[{ required: true, message: 'Please select the designation!' }]}
		>
			<Input disabled="true" id="designation" />
		</Form.Item>
  
		<Form.Item
		  label="Qualification"
		  name="qualification"
		  //rules={[{ required: true, message: 'Please input the qualification!' }]}
		>
			<Input disabled="true" id="qualification" />
		</Form.Item>

		<Form.Item
		  label="Bonus Amount"
		  name="extensionAmount"
		  rules={[{ required: true, message: 'Please input the bonus amount!' }]}
		>
			<Input id="extensionAmount" />
		</Form.Item>

		<Form.Item
		  label="Reason"
		  name="reason"
		  rules={[{ required: true, message: 'Please input the reason for salary bonus!' }]}
		>
			<Input id="reason" />
		</Form.Item>
    
		<Form.Item {...tailLayout}>
		  <Button type="primary" htmlType="submit">
			Add Salary Bonus
		  </Button>
		</Form.Item>
	  </Form>
	);
  };

export default StaffSalaryBonuses
