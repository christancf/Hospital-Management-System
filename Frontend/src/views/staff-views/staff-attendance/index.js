import React from 'react'
import { Form, Input, Button, Typography, Cascader, message } from 'antd';
import staffService from 'services/StaffService';

const { Title } = Typography
const { Search } = Input;
const checkin = 'checkin'
const checkout = 'checkout'

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
	let staffDetails

	const onFinish = values => {

		//console.log(String(values.attendanceType) === 'check in')
		let staffID = values.staffID
		if(String(values.attendanceType) === 'check in') {
			message.loading({content: 'Please wait...', checkin})
			//console.log(staffID)
			let checkIn = new Date().getTime();
			//console.log('time: ', checkInTime)

			staffService.checkInAttendance({staffID, checkIn})
			.then(() => {
				message.success({content: 'Successfully Marked Attendance', checkin, duration: 2})
			})
		}
		else {
			message.loading({content: 'Please wait...', checkout})
			let checkOut = new Date().getTime();
			staffService.checkOutAttendance({staffID, checkOut})
			.then(() => {
				message.success({content: 'Successfully Marked Attendance', checkout, duration: 2})
			})
			.catch(() => 
				message.error({content: 'Please Try Again!', checkout, duration: 2}))
		}
	};
  
	const onFinishFailed = errorInfo => {
		console.log('Failed: ', errorInfo)
	}; 
  
	const searchById = (id) => {

		staffService.readStaffDetails(id)
		.then((details) => {
			staffDetails = details[0]
			document.getElementById('staffName').value = staffDetails.staffName 
			document.getElementById('NIC').value = staffDetails.NIC
			document.getElementById('designation').value = staffDetails.designation 
			document.getElementById('qualification').value = staffDetails.qualification 
		})
		.catch((e) => console.log(`Error: ${ e }`))
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
