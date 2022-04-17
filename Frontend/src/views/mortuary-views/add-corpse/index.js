import React from 'react'
import { Form, Input, Button, DatePicker, Cascader, Radio } from 'antd';
import moment from 'moment';
import mortuaryService from 'services/MortuaryService';


const Home = () => {
	return (
		<div>
			<h1>Add Corpse Details</h1>
			<Demo />
		</div>
	)
}
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function disabledDate(current) {
	// Can not select days before today and today
	return current && current > moment().endOf('day');
}

function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
	  result.push(i);
	}
	return result;
}

function disabledDateTime() {
	return {
	  disabledHours: () => {
		  const now = new Date()
		  let hour = now.getHours()
		  return range(hour, 24);
		}
	};
}

const Demo = () => {

	 const onFinish = values => {
		const corpseData = {
			NIC: values.nic,
			name: values.name,
			sex: values.sex,
			address: values.address,
			date_of_birth: moment(values.dob).valueOf(),
			date_time_of_death: moment(values.dod).valueOf(),
			cause_of_death: values.cod[0],
			specifics_of_death: values.sod
		}
		const result = mortuaryService.addCorpse(corpseData)
		result.then(value => {
			if(value.success == true) {
				console.log('Successfully added:', values);
				window.location = '.../home'
			} else {
				alert('Try inserting again')
			}
		  })
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
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
				label="NIC"
				name="nic"
				rules={[{ required: true, message: 'Please input the NIC!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Name"
				name="name"
				rules={[{ required: true, message: 'Please input the name!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Sex"
				name="sex"
				rules={[{ required: true, message: 'Please choose the Sex!' }]}
			>
				<Radio.Group>
					<Radio value="male">Male</Radio>
					<Radio value="female">Female</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				label="Address"
				name="address"
				rules={[{ required: true, message: 'Please input the Address!' }]}
			>
				<Input.TextArea />
			</Form.Item>
			
			<Form.Item
				label="Date of Birth"
				name="dob"
				rules={[{ required: true, message: 'Please input the Date of Birth!' }]}
			>
				<DatePicker
					placeholder='Select Date'
					format="YYYY-MM-DD"
					disabledDate={disabledDate}
				/>
			</Form.Item>

			<Form.Item
				label="Date & Time of Death"
				name="dod"
				rules={[{ required: true, message: 'Please input the Date & Time of Death!' }]}
			>
				<DatePicker
					placeholder='Select Date & Time'
					format="YYYY-MM-DD HH:mm:ss"
					disabledDate={disabledDate}
					disabledTime={disabledDateTime}
					showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
    			/>
			</Form.Item>

			<Form.Item
				label="Cause of Death"
				name="cod"
				rules={[{ required: false }]}
			>
				<Cascader options={causeOfDeath} placeholder="Select Cause of Death"/>
			</Form.Item>

			<Form.Item
				label="Specifics about Death"
				name="sod"
				rules={[{ required: false}]}
			>
				<Input.TextArea />
			</Form.Item>

		  <Form.Item {...tailLayout}>
			<Button type="primary" htmlType="submit">
			  Submit
			</Button>
		  </Form.Item>
		</Form>
	  );
}
const causeOfDeath = [{
	value: 'Natural',
	label: 'Natural'
},
{
	value: 'Accident',
	label: 'Accident'
},
{
	value: 'Homicide',
	label: 'Homicide'
},
{
	value: 'Suicide',
	label: 'Suicide'
}]
export default Home
