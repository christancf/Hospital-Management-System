import React from 'react'
import { Form, Input, Button, message, Card, Modal, Select } from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import staffService from 'services/StaffService';

const { Search } = Input;
const resign = 'resign'
const { confirm } = Modal
const { Option } = Select

const StaffResignation = () => {
	return (
		<div>
			<Demo></Demo>
		</div>
	)
}

const showResignationConfirm = (id, name) => {
    confirm({
      title: 'Are you sure you want to mark ' + name + ' as Resigned?',
      icon: <ExclamationCircleOutlined />,
      content: 'Staff ID: ' + id,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        staffService.updateStatus({'staffID': id})
 		.then(() => message.success({content: 'Marked as Resigned!', resign, duration: 2}))
		.catch((e) => message.error({content: 'Please try again!', resign, duration: 2}))
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
		
		showResignationConfirm(values.staffID, values.staffName)
		form.resetFields()
	};
  
	const onFinishFailed = errorInfo => {
		console.log('Failed: ', errorInfo);
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
		<Card style={{backgroundColor: '#efefef'}}>
			<h1 className='text-left' style={{ marginLeft: 450, marginBottom: 20 }}>Staff Resignation</h1>
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
					<Input style={{pointerEvents: 'none'}} id="staffName" />
				</Form.Item>
		
				<Form.Item
				label="NIC"
				name="NIC"
				style={{cursor: 'not-allowed'}}
				>
					<Input style={{pointerEvents: 'none'}} id="NIC" />
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
					<Input style={{pointerEvents: 'none'}} id="qualification" />
				</Form.Item>
			
				<Form.Item {...tailLayout}>
					<Button htmlType="reset" style={{marginRight: 30}}>
						Discard
					</Button>
					<Button type="primary" htmlType="submit">
						Mark As Resigned
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
  };

export default StaffResignation
