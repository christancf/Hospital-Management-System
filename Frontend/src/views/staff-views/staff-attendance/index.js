import React from 'react'
import { Form, Input, Button, Card, Select, Modal } from 'antd';
import staffService from 'services/StaffService';

const { Search } = Input;
const { Option } = Select

const StaffAttendance = () => {
	return (
		<div>
			<Demo></Demo>
		</div>
	)
}

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 8 },
  };
const tailLayout = {
	wrapperCol: { offset: 9, span: 16 },
  };

  const Demo = () => {
	const [form] = Form.useForm();

	function ShowModel(title, delay, innercontent, isSuccess) {

		if (isSuccess) {
			const modal = Modal.success({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
				//window.location.href="../staff/display-staff-details";
			}, delay * 1000);
		}

		else {
			const modal = Modal.error({
				title: title,
				content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
			});
			const timer = setInterval(() => {
				delay -= 1;
				modal.update({
					content: `${innercontent}.This popup will be destroyed after ${delay} second.`,
				});
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				modal.destroy();
			}, delay * 1000);
		}
	}

	let staffDetails

	const onFinish = values => {

		let staffID = values.staffID

		if(String(values.attendanceType) === 'check in') {

			let checkIn = new Date().getTime();

			staffService.checkInAttendance({staffID, checkIn})
			.then((status) => {
				console.log(status)
				if(status === 'Resigned') {
					ShowModel("Member is Resigned!", 4, "Cannot mark attendance of a resigned member", false)
				}
				else if(status) {
					ShowModel("Successful!", 2, "Check In Attendance marked Successfully", true)
				}
				else {
					ShowModel("Failed!", 4, " Previous Check Out Attendance of this member is not marked", false)
				}
			
			})
			.catch(() => 
			ShowModel("Failed!", 2, "Failed to Mark Check In Attendance", false))
		}
		else {
			let checkOut = new Date().getTime();
			console.log(staffID)
			staffService.checkOutAttendance({staffID, checkOut})
			.then((status) => {
				if(status === 'Resigned') {
					ShowModel("Member is Resigned!", 4, "Cannot mark attendance of a resigned member", false)
				}
				else if(status) {
					ShowModel("Successful!", 2, "Check Out Attendance marked Successfully", true)
				}
				else {
					ShowModel("Failed!", 4, " Previous Check In Attendance of this member is not marked", false)
				}
			})
			.catch(() => 
			ShowModel("Failed!", 2, "Failed to Mark Check Out Attendance", false))
		}
		form.resetFields();
	};
  
	const onFinishFailed = errorInfo => {
		console.log('Failed: ', errorInfo)
	}; 
  
	const searchById = (id) => {

		staffService.readStaffDetails(id)
		.then((details) => {
			staffDetails = details[0]

			form.setFieldsValue({
				staffName: staffDetails.staffName,
				NIC: staffDetails.NIC,
				designation: staffDetails.designation,
				qualification: staffDetails.qualification	
			})

			document.getElementById('staffID').setAttribute('disabled', 'true')
		})
		.catch((e) => console.log(`Error: ${ e }`))
	};
  
	return (
		<Card>
			<h1 className='text-left' style={{ marginLeft: 460, marginBottom: 20 }}>Staff Attendance</h1>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				form={form}
			>
				<Form.Item
				label="Staff ID"
				name="staffID"
				rules={[{ required: true, message: 'Please input the staff ID!' }]}
				>
					<Search placeholder="Enter Staff ID" onSearch={id => searchById(id)} enterButton id="staffID" />
				</Form.Item>
		
				<Form.Item
				label="Name"
				name="staffName"
				style={{cursor: 'not-allowed'}}
				>
					<Input style={{pointerEvents: 'none'}}/>
				</Form.Item>
		
				<Form.Item
				label="NIC"
				name="NIC"
				style={{cursor: 'not-allowed'}}
				>
					<Input style={{pointerEvents: 'none'}}/>
				</Form.Item>
		
				<Form.Item name="designation" label="Designation" style={{cursor: 'not-allowed'}}>
					<Select allowClear style={{pointerEvents: 'none'}}>
						<Option value="doctor">Doctor</Option>
						<Option value="nurse">Nurse</Option>
						<Option value="allied health professionals">Allied Health Professionals</Option>
					</Select>
				</Form.Item>
		
				<Form.Item
				label="Qualification"
				name="qualification"
				style={{cursor: 'not-allowed'}}
				>
					<Input style={{pointerEvents: 'none'}}/>
				</Form.Item>

				<Form.Item name="attendanceType" label="Attendance Type" rules={[{ required: true, message: 'Please select the attendance type' }]}>
					<Select allowClear>
						<Option value="check in">Check In</Option>
						<Option value="check out">Check Out</Option>
					</Select>
				</Form.Item>
			
				<Form.Item {...tailLayout}>
					<Button htmlType="reset" style={{ marginRight: 30 }}>
						Discard
					</Button>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
  };
  
export default StaffAttendance
