import React from 'react'
import { Form, Input, Button, Card, Select, message } from 'antd';
import staffService from 'services/StaffService';

const { Search } = Input;
const { Option } = Select;
const bonus = 'bonus'

const StaffSalaryBonuses = () => {
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
	let staffDetails
  
	const onFinish = values => {
		let staffID = values.staffID
		let bonusAmount = Number(values.bonus)
		let addedDate = new Date().getTime()
		console.log(staffID, bonusAmount, addedDate)

		staffService.addBonus({staffID, bonusAmount, addedDate})
		.then(() => message.success({content: 'Bonus Added', bonus, duration: 2}))
		.catch((e) => message.error({content: 'Please try again!', bonus, duration: 2}))
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
			<h1 className='text-left' style={{ marginLeft: 430, marginBottom: 20 }}>Staff Salary Bonuses</h1>
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
					<Search placeholder="Enter Staff ID" onSearch={id => searchById(id)} enterButton id="staffID"/>
				</Form.Item>
		
				<Form.Item
				label="Name"
				name="staffName"
				style={{cursor: 'not-allowed'}}
				>
					<Input style={{pointerEvents:'none'}} id="staffName" />
				</Form.Item>
		
				<Form.Item
				label="NIC"
				name="NIC"
				style={{cursor: 'not-allowed'}}
				>
					<Input style={{pointerEvents:'none'}} id="NIC" />
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
					<Input style={{pointerEvents:'none'}} id="qualification" />
				</Form.Item>

				<Form.Item
				label="Bonus Amount"
				name="bonus"
				rules={[{ required: true, message: 'Please input the bonus amount!'}, {pattern: "[0-9]+", message: 'Please input a numerical value'}]}
				>
					<Input id="bonus" />
				</Form.Item>
			
				<Form.Item {...tailLayout}>
					<Button htmlType="reset" style={{marginRight: 30}}>
						Discard
					</Button>
					<Button type="primary" htmlType="submit">
						Add Salary Bonus
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
  };

export default StaffSalaryBonuses
