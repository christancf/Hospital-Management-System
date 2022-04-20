import React from 'react'
import { Form, Input, Button, Card } from 'antd';

const { Search } = Input;

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
	wrapperCol: { offset: 10, span: 16 },
  };

  const Demo = () => {

	const [form] = Form.useForm();
  
	const onFinish = values => {
	};
  
	const onFinishFailed = errorInfo => {
	}; 
  
	const searchById = (id) => {
	};
  
	return (
		<Card style={{backgroundColor: '#efefef'}}>
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
					<Search placeholder="Enter Staff ID" onSearch={id => searchById(id)} enterButton />
				</Form.Item>
		
				<Form.Item
				label="Name"
				name="staffName"
				>
					<Input disabled="true" id="staffName" />
				</Form.Item>
		
				<Form.Item
				label="NIC"
				name="NIC"
				>
					<Input disabled="true" id="NIC" />
				</Form.Item>
		
				<Form.Item
				label="Designation"
				name="designation"
				>
					<Input disabled="true" id="designation" />
				</Form.Item>
		
				<Form.Item
				label="Qualification"
				name="qualification"
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
