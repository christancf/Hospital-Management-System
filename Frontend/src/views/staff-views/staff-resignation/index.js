import React from 'react'
import { Form, Input, Button, message, Card, Modal } from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import staffService from 'services/StaffService';

const { Search } = Input;
const resign = 'resign'
const { confirm } = Modal

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
      content: 'ID: ' + id + ' Staff Name: ' + name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        staffService.updateStatus(id)
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
		if(values.staffName === undefined) values.staffName = staffDetails.staffName
		if(values.NIC === undefined) values.NIC = staffDetails.NIC
		if(values.designation === undefined) values.designation = staffDetails.designation
		if(values.qualification === undefined) values.qualification = staffDetails.qualification
		console.log(values.staffName)
		showResignationConfirm(values.staffID, values.staffName)
		form.resetFields();
	};
  
	const onFinishFailed = errorInfo => {
		console.log('Failed: ', errorInfo);
	}; 
  
	const searchById = (id) => {

		staffService.readStaffDetails(id)
		.then((details) => {
			staffDetails = details[0] 
			document.getElementById('staffName').value = staffDetails.staffName
			document.getElementById('NIC').value = staffDetails.NIC
			document.getElementById('designation').value = staffDetails.designation[0].toUpperCase() + staffDetails.designation.substring(1)
			document.getElementById('qualification').value = staffDetails.qualification
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
