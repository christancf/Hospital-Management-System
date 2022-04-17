import React from 'react'
import { Form, Input, Button, Typography, Cascader } from 'antd';

const { Title } = Typography
const { Search } = Input;

const StaffAttendance = () => {
	return (
		<div>
			<Title>Staff Attendance</Title>
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
        label="Attendance Type"
        name="attendanceType"
        rules={[{ required: true, message: 'Please select attendance type' }]}
      >
		  <Cascader options={ attendanceType } id="attendanceType" />
      </Form.Item>
    
		<Form.Item {...tailLayout}>
		  <Button type="primary" htmlType="submit">
			Submit
		  </Button>
		</Form.Item>
	  </Form>
	);
  };


//Attendance Option
const attendanceType = [{
	value: 'check in',
	label: 'Check In'
},
{
	value: 'check out',
	label: 'Check Out'
}]
  
export default StaffAttendance
